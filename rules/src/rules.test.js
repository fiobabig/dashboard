const firebase = require("firebase");
require("firebase/firestore");

const { setup, teardown } = require("./helpers");

describe("Database Rules", () => {
  afterAll(async () => await teardown());

  it("Denies reading and writing by default", async () => {
    const db = await setup();
    const ref = db.collection("does-not-exist");

    await expect(ref.get()).toDeny();
    await expect(ref.add({})).toDeny();
  });
});
