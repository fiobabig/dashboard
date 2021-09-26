import { setupDoc } from "../..";
import { StoredData } from "../../firestore";

export function itAllowsReadUsingValidRoles(
  document: string,
  uid: string,
  existingData?: StoredData
) {
  it.each(["read", "edit", "admin"])(
    `Allows '${uid}' to read '${document} using '%s' role`,
    async (role) => {
      const ref = await setupDoc(document, uid, {
        ...existingData,
        ...{ [document]: { roles: { [uid]: role } } },
      });

      await expect(ref.get()).toAllow();
    }
  );
}
