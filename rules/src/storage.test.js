const { setup } = require("./helpers");

describe("Storage Rules", () => {
  afterAll(async () => await teardown());

  it("Denies reading and writing by default", async () => {
    const storage = (await setup()).storage();

    const ref = storage.ref("does-not-exist");
    await expect(ref.getDownloadURL()).toDeny();
    await expect(ref.putString("nope")).toDeny();
  });

  it("Allows user to write to their folder", async () => {
    const uid = "test-user";
    const storage = (await setup(uid)).storage();

    const ref = storage.ref(`users/${uid}/file.txt`);

    await expect(await ref.putString("works")).toAllow();
  });

  it("Denies user writing to another folder", async () => {
    const me = "me";
    const them = "them";
    const storage = (await setup(me)).storage();

    const ref = storage.ref(`users/${them}/file.txt`);

    await expect(ref.putString("no-works")).toDeny();
  });
});
