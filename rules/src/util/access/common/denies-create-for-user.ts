import { DocumentData } from "firebase/firestore";
import { setupDoc } from "../..";
import { describeIt } from "../../common";

export function itDeniesCreateForUser(
  document: string,
  uid: string,
  incomingData: DocumentData,
  reason?: string
) {
  describeIt(`Denies '${uid}' to create '${document}'`, reason, async () => {
    const ref = await setupDoc(document, uid);

    await expect(ref.set(incomingData)).toDeny();
  });
}
