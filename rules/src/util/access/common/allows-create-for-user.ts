import { DocumentData } from "firebase/firestore";
import { setupDoc } from "../../firestore";

export function itAllowsCreateForUser(
  document: string,
  uid: string,
  incomingData: DocumentData
) {
  it(`Allows '${uid}' to create '${document}'`, async () => {
    const ref = await setupDoc(document, uid);

    await expect(ref.set(incomingData)).toAllow();
  });
}
