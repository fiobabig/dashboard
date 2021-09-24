import { setup, uid } from "../common";
import { setupData } from "../firestore";

export function itAllowsAccessToMyData(
  collection: string,
  data?: Parameters<typeof setupData>[0]
) {
  it(`Allows access to my ${collection} data`, async () => {
    const { firestore } = await setup(uid.me);

    if (data) {
      await setupData(data);
    }

    const ref = firestore.doc(`${collection}/${uid.me}`);

    await expect(ref.get()).toAllow();
    await expect(ref.set({})).toAllow();
  });
}
