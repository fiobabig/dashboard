import { DocumentData } from "firebase/firestore";
import { setupDoc } from "../..";

export function itDeniesCreateForUser(
  document: string,
  uid: string,
  incomingData: DocumentData
) {
  it(`Denies '${uid}' to create '${document}'`, async () => {
    const ref = await setupDoc(document, uid);

    await expect(ref.set(incomingData)).toDeny();
  });
}
