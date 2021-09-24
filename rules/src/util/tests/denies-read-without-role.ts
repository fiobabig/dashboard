import { setup, uid } from "../common";
import { setupData } from "../firestore";

export function itDeniesReadWithoutRole(document: string) {
  it(`Denies read without a role`, async () => {
    await setupData({
      [document]: {
        roles: {
          [uid.them]: "owner",
        },
      },
    });

    const { firestore } = await setup(uid.me);

    const ref = firestore.doc(document);

    await expect(ref.get()).toDeny();
  });
}
