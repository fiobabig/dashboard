import { DocumentData } from "firebase/firestore";
import { v4 } from "uuid";
import { setupDoc } from "../..";
import { StoredData } from "../../firestore";

export function itDeniesUpdateUsingInvalidRoles(
  document: string,
  uid: string,
  existingData: StoredData,
  incomingData: DocumentData
) {
  it.each(["read", "create", "delete", v4()])(
    `Denies '${uid}' to update '${document} using '%s' role`,
    async (role) => {
      const ref = await setupDoc(document, uid, {
        ...existingData,
        ...{ [document]: { roles: { [uid]: role } } },
      });

      await expect(ref.set(incomingData)).toDeny();
    }
  );
}
