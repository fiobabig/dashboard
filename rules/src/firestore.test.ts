import { serverTimestamp } from "firebase/firestore";
import { v4 } from "uuid";
import { clearFirestore, setup, setupData } from "./util";
import {
  itAllowsAccessToMyData,
  itDeniesAccessToTheirData,
  itDeniesByDefault,
} from "./util/tests/firestore";

const me = "me";
const them = "them";
const dashboard = "dashboard";

const tokenId = () => `tokens/${v4()}`;

describe("Database Rules", () => {
  afterEach(async () => await clearFirestore());

  itDeniesByDefault();

  describe("When accessing a user...", () => {
    const collection = "users";

    itDeniesAccessToTheirData(collection, (uid) => ({
      [`users/${uid}`]: {
        dashboards: {
          [dashboard]: {},
        },
      },
    }));
    // it("Denies accessing another user's data", async () => {
    //   const { firestore } = await setup(me);

    // await setupData({
    //   [`users/${me}`]: {
    //     dashboards: {
    //       [dashboard]: {},
    //     },
    //   },
    // });

    //   const ref = firestore.doc(`users/${them}}`);

    //   await expect(ref.get()).toDeny();
    //   await expect(ref.set({})).toDeny();
    // });

    itAllowsAccessToMyData(collection);

    // it("Allows access to my user data", async () => {
    //   const { firestore } = await setup(me);

    //   const ref = firestore.doc(`users/${me}`);

    //   await expect(ref.get()).toAllow();
    //   await expect(ref.set({})).toAllow();
    // });

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

    it("Allows access to create a token", async () => {
      const { firestore } = await setup(dashboard);

      const ref = firestore.doc(tokenId());

      await expect(ref.set(validToken)).toAllow();
    });

    it("Denies access for another user", async () => {
      const { firestore } = await setup(them);

      const ref = firestore.doc(tokenId());

      await expect(ref.set(validToken)).toDeny();
    });

    it("Denies access if invalid created timestamp", async () => {
      const { firestore } = await setup(dashboard);

      const ref = firestore.doc(tokenId());

      await expect(
        ref.set({
          ...validToken,
          createdAt: 0,
        })
      ).toDeny();
    });

    it("Denies access if invalid properties", async () => {
      const { firestore } = await setup(dashboard);

      const ref = firestore.doc(tokenId());

      await expect(
        ref.set({
          ...validToken,
          invalid: "I am not allowed",
        })
      ).toDeny();
    });

    it.each`
      key
      ${"createdAt"}
      ${"dashboardUid"}
    `("Denies if missing '$key'", async ({ key }) => {
      const { firestore } = await setup(dashboard);

      const ref = firestore.doc(tokenId());

      const value: { [key: string]: any } = { ...validToken };
      delete value[key];

      await expect(ref.set(value)).toDeny();
    });
  });

  describe("When updating a token...", () => {
    it("Allows access for owner", async () => {
      const id = tokenId();

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
      const id = tokenId();

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
      const id = tokenId();

      const { firestore } = await setup(dashboard);

      await setupData({
        [id]: {
          ownerUid: dashboard,
        },
      });

      const ref = firestore.doc(tokenId());

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
