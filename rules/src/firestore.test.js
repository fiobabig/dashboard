const { setup, teardown } = require("./helpers");
const { serverTimestamp } = require("firebase/firestore");

const { v4 } = require("uuid");

const me = "me";
const them = "them";
const dashboard = "dashboard";

const tokenId = () => `tokens/${v4()}`;

describe("Database Rules", () => {
  afterAll(async () => await teardown());

  it("Denies reading and writing by default", async () => {
    const db = (await setup()).firestore();
    const ref = db.collection("does-not-exist");

    await expect(ref.get()).toDeny();
    await expect(ref.add({})).toDeny();
  });

  describe("When accessing a user...", () => {
    it("Denies accessing another user's data", async () => {
      const data = {
        [`users/${me}`]: {
          dashboards: {
            [dashboard]: {},
          },
        },
      };

      const db = (await setup(me, data)).firestore();
      const ref = db.doc(`users/${them}}`);

      await expect(ref.get()).toDeny();
      await expect(ref.set({})).toDeny();
    });

    it("Allows access to my user data", async () => {
      const db = (await setup(me)).firestore();
      const ref = db.doc(`users/${me}`);

      await expect(ref.get()).toAllow();
      await expect(ref.set({})).toAllow();
    });

    it("Allows read-only access to my user data from one of my dashboards", async () => {
      const data = {
        [`users/${me}`]: {
          dashboards: {
            [dashboard]: {},
          },
        },
      };

      const db = (await setup(dashboard, data)).firestore();
      const ref = db.doc(`users/${me}`);

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
      const db = (await setup(dashboard)).firestore();

      const ref = db.doc(tokenId());

      await expect(ref.set(validToken)).toAllow();
    });

    it("Denies access for another user", async () => {
      const db = (await setup(them)).firestore();

      const ref = db.doc(tokenId());

      await expect(ref.set(validToken)).toDeny();
    });

    it("Denies access if invalid created timestamp", async () => {
      const db = (await setup(dashboard)).firestore();

      const ref = db.doc(tokenId());

      await expect(
        ref.set({
          ...validToken,
          createdAt: 0,
        })
      ).toDeny();
    });

    it("Denies access if invalid properties", async () => {
      const db = (await setup(dashboard)).firestore();

      const ref = db.doc(tokenId());

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
      const db = (await setup(dashboard)).firestore();

      const ref = db.doc(tokenId());

      const value = { ...validToken };
      delete value[key];

      await expect(ref.set(value)).toDeny();
    });
  });

  describe("When updating a token...", () => {
    it("Allows access for owner", async () => {
      const id = tokenId();
      const data = {
        [id]: {
          ownerUid: me,
        },
      };

      const db = (await setup(me, data)).firestore();

      const ref = db.doc(id);

      await expect(ref.set({}, { merge: true })).toAllow();
    });

    it("Denies access for owner", async () => {
      const id = tokenId();
      const data = {
        [id]: {
          ownerUid: them,
        },
      };

      const db = (await setup(me, data)).firestore();

      const ref = db.doc(id);

      await expect(ref.set({}, { merge: true })).toDeny();
    });

    it("Denies access if invalid properties", async () => {
      const id = tokenId();
      const data = {
        [id]: {
          ownerUid: dashboard,
        },
      };

      const db = (await setup(dashboard, data)).firestore();

      const ref = db.doc(tokenId());

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
