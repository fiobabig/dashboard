import { v4 } from "uuid";
import { setupDoc } from "../..";

export function itDeniesDeleteUsingInvalidRoles(document: string, uid: string) {
  it.each(["read", "create", "update", "edit", v4()])(
    `Denies '${uid}' to delete '${document} using '%s' role`,
    async (role) => {
      const ref = await setupDoc(document, uid, {
        [document]: { roles: { [uid]: role } },
      });

      await expect(ref.delete()).toDeny();
    }
  );
}
