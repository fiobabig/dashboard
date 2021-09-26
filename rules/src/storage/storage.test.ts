import { clearStorage, setup, uid, uploadTextFile } from "../util";

describe("Storage Rules", () => {
  afterAll(async () => await clearStorage());

  it("Denies reading and writing by default", async () => {
    const { storage } = await setup(uid.unauthenticated);

    const ref = storage.ref("does-not-exist");

    await expect(ref.getDownloadURL()).toDeny();
    await expect(ref.putString("nope")).toDeny();
  });

  it("Allows user to write to their folder", async () => {
    const { storage } = await setup(uid.me);

    const ref = storage.ref(`users/${uid.me}/file.txt`);

    await expect(uploadTextFile(ref)).toAllow();
  });

  it("Denies user writing to another folder", async () => {
    const { storage } = await setup(uid.me);

    const ref = storage.ref(`users/${uid.them}/file.txt`);

    await expect(uploadTextFile(ref)).toDeny();
  });
});
