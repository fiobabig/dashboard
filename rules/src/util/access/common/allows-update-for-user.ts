import { DocumentData } from "firebase/firestore";
import { setupDoc } from "../..";
import { describeIt } from "../../common";
import { StoredData } from "../../firestore";

export function itAllowsUpdateForUser(
  document: string,
  uid: string,
  storedData: StoredData,
  incomingData: DocumentData,
  reason?: string
) {
  describeIt(`Allows '${uid}' to update '${document}'`, reason, async () => {
    const ref = await setupDoc(document, uid, storedData);

    await expect(ref.set(incomingData, { merge: true })).toAllow();
  });
}
