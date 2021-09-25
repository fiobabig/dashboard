import { setupDoc, StoredData } from "../../firestore";

export function itAllowsReadForUser(
  document: string,
  uid: string,
  existingData?: StoredData
) {
  it(`Allows '${uid}' to read '${document}'`, async () => {
    const ref = await setupDoc(document, uid, existingData);

    await expect(ref.get()).toAllow();
  });
}
