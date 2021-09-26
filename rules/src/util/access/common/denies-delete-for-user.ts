import { setupDoc } from "../..";
import { describeIt } from "../../common";

export function itDeniesDeleteForUser(
  document: string,
  uid: string,
  reason?: string
) {
  describeIt(`Denies '${uid}' to delete '${document}'`, reason, async () => {
    const ref = await setupDoc(document, uid);

    await expect(ref.delete()).toDeny();
  });
}
