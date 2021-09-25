import { setupDoc } from "../..";

export function itDeniesDeleteForUser(document: string, uid: string) {
  it(`Denies '${uid}' to delete '${document}'`, async () => {
    const ref = await setupDoc(document, uid);

    await expect(ref.delete()).toDeny();
  });
}
