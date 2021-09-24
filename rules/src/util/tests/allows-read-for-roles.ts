import { setup, uid } from "../common";
import { setupData } from "../firestore";

export function itAllowsReadForRoles(document: string) {
  it.each(["read", "edit", "owner"])(
    `Allows read with '%s' role`,
    async (role: string) => {
      await setupData({
        [document]: {
          roles: {
            [uid.me]: role,
          },
        },
      });

      const { firestore } = await setup(uid.me);

      const ref = firestore.doc(document);

      await expect(ref.get()).toAllow();
    }
  );
}
