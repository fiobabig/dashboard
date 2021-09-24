import { serverTimestamp } from "firebase/firestore";
import { v4 } from "uuid";
import { clearFirestore, setup, setupData } from "./util";
import {
  itAllowsAccessToMyData,
  itAllowsDeleteForRoles,
  itAllowsReadForRoles,
  itAllowsWriteForRoles,
  itAllowsWriteForUser,
  itDeniesAccessToTheirData,
  itDeniesByDefault,
  itDeniesDeleteForInvalidRoles,
  itDeniesReadWithoutRole,
  itDeniesWriteForInvalidRoles,
  itDeniesWriteForUser,
  itDeniesWriteIfIncludesDisallowedProperty,
  itDeniesWriteIfInvalidCreatedAt,
  itDeniesWriteIfMissingRequiredValue,
} from "./util/tests/firestore";

const me = "me";
const them = "them";
const dashboard = "dashboard";

const tokenDocPath = () => `tokens/${v4()}`;

describe("Database Rules", () => {
  afterEach(async () => await clearFirestore());

  itDeniesByDefault();

  describe("Roles examples", () => {
    const doc = "rolestest/test";
    const validData = {};

    itDeniesReadWithoutRole(doc);

    itAllowsReadForRoles(doc);

    itAllowsWriteForRoles(doc, validData);

    itDeniesWriteForInvalidRoles(doc, validData);

    itAllowsDeleteForRoles(doc);

    itDeniesDeleteForInvalidRoles(doc);
  });

  describe("When accessing a user...", () => {
    const collection = "users";

    itDeniesAccessToTheirData(collection, (uid) => ({
      [`users/${uid}`]: {
        dashboards: {
          [dashboard]: {},
        },
      },
    }));

    itAllowsAccessToMyData(collection);

    it("Allows read-only access to my user data from one of my dashboards", async () => {
      const { firestore } = await setup(dashboard);

      await setupData({
        [`users/${me}`]: {
          dashboards: {
            [dashboard]: {},
          },
        },
      });

      const ref = firestore.doc(`users/${me}`);

      await expect(ref.get()).toAllow();
      await expect(ref.set({})).toDeny();
    });
  });

  describe("When creating a token...", () => {
    const validToken = {
      createdAt: serverTimestamp(),
      dashboardUid: dashboard,
    };

    itAllowsWriteForUser(dashboard, tokenDocPath(), validToken);

    itDeniesWriteForUser(them, tokenDocPath(), validToken);

    itDeniesWriteIfInvalidCreatedAt(tokenDocPath(), validToken);

    itDeniesWriteIfIncludesDisallowedProperty(tokenDocPath(), validToken);

    itDeniesWriteIfMissingRequiredValue(tokenDocPath(), validToken);
  });

  describe("When updating a token...", () => {
    it("Allows access for owner", async () => {
      const id = tokenDocPath();

      const { firestore } = await setup(me);

      await setupData({
        [id]: {
          ownerUid: me,
        },
      });

      const ref = firestore.doc(id);

      await expect(ref.set({}, { merge: true })).toAllow();
    });

    it("Denies access for owner", async () => {
      const id = tokenDocPath();

      const { firestore } = await setup(me);

      await setupData({
        [id]: {
          ownerUid: them,
        },
      });

      const ref = firestore.doc(id);

      await expect(ref.set({}, { merge: true })).toDeny();
    });

    it("Denies access if invalid properties", async () => {
      const id = tokenDocPath();

      const { firestore } = await setup(dashboard);

      await setupData({
        [id]: {
          ownerUid: dashboard,
        },
      });

      const ref = firestore.doc(tokenDocPath());

      await expect(
        ref.set({ dashboardUid: "Faker" }, { merge: true })
      ).toDeny();
      await expect(
        ref.set({ [v4()]: "Random Value" }, { merge: true })
      ).toDeny();
      await expect(
        ref.set({ createdAt: serverTimestamp() }, { merge: true })
      ).toDeny();
    });
  });
});
