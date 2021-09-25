import { DocumentData } from "firebase/firestore";
import { setupDoc } from "../..";
import { StoredData } from "../../firestore";

export function itAllowsUpdateForUser(
  document: string,
  uid: string,
  existingData: StoredData,
  incomingData: DocumentData
) {
  it(`Allows '${uid}' to update '${document}'`, async () => {
    const ref = await setupDoc(document, uid, existingData);

    await expect(ref.set(incomingData, { merge: true })).toAllow();
  });
}
