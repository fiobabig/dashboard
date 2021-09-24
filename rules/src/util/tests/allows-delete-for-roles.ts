import { setup, uid } from "../common";
import { setupData } from "../firestore";

export function itAllowsDeleteForRoles(document: string) {
  it.each(["owner"])(`Allows delete with '%s' role`, async (role: string) => {
    await setupData({
      [document]: {
        roles: {
          [uid.me]: role,
        },
      },
    });

    const { firestore } = await setup(uid.me);

    const ref = firestore.doc(document);

    await expect(ref.delete()).toAllow();
  });
}
