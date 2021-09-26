import { setupDoc } from "../..";
import { describeIt } from "../../common";

export function itAllowsDeleteForUser(
  document: string,
  uid: string,
  reason?: string
) {
  describeIt(`Allows '${uid}' to delete '${document}'`, reason, async () => {
    const ref = await setupDoc(document, uid);

    await expect(ref.delete()).toAllow();
  });
}
