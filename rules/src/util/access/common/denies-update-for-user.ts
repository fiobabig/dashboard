import { DocumentData } from "firebase/firestore";
import { setupDoc } from "../..";
import { StoredData } from "../../firestore";

export function itDeniesUpdateForUser(
  document: string,
  uid: string,
  existingData: StoredData,
  incomingData: DocumentData
) {
  it(`Denies '${uid}' to update '${document}'`, async () => {
    const ref = await setupDoc(document, uid, existingData);

    await expect(ref.set(incomingData, { merge: true })).toDeny();
  });
}
