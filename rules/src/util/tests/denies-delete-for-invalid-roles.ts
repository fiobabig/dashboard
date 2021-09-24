import { v4 } from "uuid";
import { setup, uid } from "../common";
import { setupData } from "../firestore";

export function itDeniesDeleteForInvalidRoles(document: string) {
  it.each(["read", "write", v4()])(
    `Denies delete with '%s' role`,
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

      await expect(ref.delete()).toDeny();
    }
  );
}
