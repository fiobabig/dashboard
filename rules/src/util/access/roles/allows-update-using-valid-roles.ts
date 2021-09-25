import { DocumentData } from "firebase/firestore";
import { setupDoc } from "../..";
import { StoredData } from "../../firestore";

export function itAllowsUpdateUsingValidRoles(
  document: string,
  uid: string,
  existingData: StoredData,
  incomingData: DocumentData
) {
  it.each(["update", "edit", "admin"])(
    `Allows '${uid}' to update '${document} using '%s' role`,
    async (role) => {
      const ref = await setupDoc(document, uid, {
        ...existingData,
        ...{ [document]: { roles: { [uid]: role } } },
      });

      await expect(ref.set(incomingData)).toAllow();
    }
  );
}
