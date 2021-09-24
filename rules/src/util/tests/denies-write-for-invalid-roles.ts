import { v4 } from "uuid";
import { setup, uid } from "../common";
import { setupData } from "../firestore";

export function itDeniesWriteForInvalidRoles(
  document: string,
  validData: Parameters<typeof setupData>[0]
) {
  it.each(["read", v4()])(
    `Denies write with '%s' role`,
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

      await expect(ref.set(validData)).toDeny();
    }
  );
}
