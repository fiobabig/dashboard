const { setup, teardown } = require("./helpers");

const me = "me";
const them = "them";

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
      const db = (await setup(me)).firestore();
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
  });
});
