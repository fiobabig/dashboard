import { setup, uid } from "../common";
import { setupData } from "../firestore";

export function itDeniesAccessToTheirData(
  collection: string,
  data?: Parameters<typeof setupData>[0]
) {
  it(`Denies access to their ${collection} data`, async () => {
    const { firestore } = await setup(uid.me);

    if (data) {
      await setupData(data);
    }

    const ref = firestore.doc(`${collection}/${uid.them}}`);

    await expect(ref.get()).toDeny();
    await expect(ref.set({})).toDeny();
  });
}
