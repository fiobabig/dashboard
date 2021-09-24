import { serverTimestamp } from "firebase/firestore";
import { v4 } from "uuid";
import { clearFirestore, setup, setupData } from "./util";
import { uid } from "./util/common";
import {
  itAllowsAccessToMyData,
  itAllowsWriteForUser,
  itDeniesAccessToTheirData,
  itDeniesByDefault,
  itDeniesWriteForUser,
  itDeniesWriteIfIncludesDisallowedProperty,
  itDeniesWriteIfInvalidCreatedAt,
  itDeniesWriteIfMissingRequiredValue,
  itHandlesReadOnlyRoles,
  itRequiresRoles,
} from "./util/tests/firestore";

const dashboard = "dashboard";

const tokenDocPath = () => `tokens/${v4()}`;

describe("Firestore Rules", () => {
  afterEach(async () => await clearFirestore());

  itDeniesByDefault();

  describe("When accessing an example collection...", () => {
    itRequiresRoles("rolestest", {});
  });

  describe("When accessing a user...", () => {
    const collection = "users";

    itDeniesAccessToTheirData(collection, {
      [`${collection}/${uid.them}`]: {
        dashboards: {
          [dashboard]: {},
        },
      },
    });

    itAllowsAccessToMyData(collection);

    describe("While logged in as a dashboard...", () => {
      const document = `${collection}/${uid.them}`;

      itHandlesReadOnlyRoles(document, {
        [document]: {
          dashboards: {
            [uid.me]: {},
          },
          roles: {
            [uid.me]: "read",
          },
        },
      });
    });
  });

  describe("When creating a token...", () => {
    const validToken = {
      createdAt: serverTimestamp(),
      dashboardUid: dashboard,
    };

    itAllowsWriteForUser(dashboard, tokenDocPath(), validToken);

    itDeniesWriteForUser(uid.them, tokenDocPath(), validToken);

    itDeniesWriteIfInvalidCreatedAt(tokenDocPath(), validToken);

    itDeniesWriteIfIncludesDisallowedProperty(tokenDocPath(), validToken);

    itDeniesWriteIfMissingRequiredValue(tokenDocPath(), validToken);
  });

  describe("When updating a token...", () => {
    const id = tokenDocPath();
    itAllowsWriteForUser(uid.me, id, {
      [id]: {
        ownerUid: uid.me,
      },
    });

    it("Allows access for owner", async () => {
      const id = tokenDocPath();

      const { firestore } = await setup(uid.me);

      await setupData({
        [id]: {
          ownerUid: uid.me,
        },
      });

      const ref = firestore.doc(id);

      await expect(ref.set({}, { merge: true })).toAllow();
    });

    it("Denies access for owner", async () => {
      const id = tokenDocPath();

      const { firestore } = await setup(uid.me);

      await setupData({
        [id]: {
          ownerUid: uid.them,
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

  describe("When accessing a dashboard...", () => {
    const collection = "dashboards";

    itRequiresRoles(collection, {
      roles: {
        [uid.them]: "read",
        [uid.me]: "owner",
      },
    });
  });
});
