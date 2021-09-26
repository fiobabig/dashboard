import { DocumentData } from "firebase/firestore";
import { describeIt } from "../../common";
import { setupDoc } from "../../firestore";

export function itAllowsCreateForUser(
  document: string,
  uid: string,
  incomingData: DocumentData,
  reason?: string
) {
  describeIt(`Allows '${uid}' to create '${document}'`, reason, async () => {
    const ref = await setupDoc(document, uid);

    await expect(ref.set(incomingData)).toAllow();
  });
}
