import { setupDoc } from "../../firestore";

export function itAllowsDeleteUsingValidRoles(document: string, uid: string) {
  it.each(["delete", "admin"])(
    `Allows '${uid}' to delete '${document} using '%s' role`,
    async (role) => {
      const ref = await setupDoc(document, uid, {
        [document]: { roles: { [uid]: role } },
      });

      await expect(ref.delete()).toAllow();
    }
  );
}
