import { setupDoc, StoredData } from "../../firestore";

export function itDeniesReadForUser(
  document: string,
  uid: string,
  existingData?: StoredData
) {
  it(`Denies '${uid}' to read '${document}'`, async () => {
    const ref = await setupDoc(document, uid, existingData);

    await expect(ref.get()).toDeny();
  });
}
