import { describeIt } from "../../common";
import { setupDoc, StoredData } from "../../firestore";

export function itDeniesReadForUser(
  document: string,
  uid: string,
  existingData?: StoredData,
  reason?: string
) {
  describeIt(`Denies '${uid}' to read '${document}'`, reason, async () => {
    const ref = await setupDoc(document, uid, existingData);

    await expect(ref.get()).toDeny();
  });
}
