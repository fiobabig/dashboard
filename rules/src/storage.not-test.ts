import { clearStorage, setup, uploadTextFile } from "./util";

describe("Storage Rules", () => {
  afterAll(async () => await clearStorage());

  it("Denies reading and writing by default", async () => {
    const { storage } = await setup();

    const ref = storage.ref("does-not-exist");

    await expect(ref.getDownloadURL()).toDeny();
    await expect(ref.putString("nope")).toDeny();
  });

  it("Allows user to write to their folder", async () => {
    const uid = "test-user";
    const { storage } = await setup(uid);

    const ref = storage.ref(`users/${uid}/file.txt`);

    await expect(uploadTextFile(ref)).toAllow();
  });

  it("Denies user writing to another folder", async () => {
    const me = "me";
    const them = "them";
    const { storage } = await setup(me);

    const ref = storage.ref(`users/${them}/file.txt`);

    await expect(uploadTextFile(ref)).toDeny();
  });
});
