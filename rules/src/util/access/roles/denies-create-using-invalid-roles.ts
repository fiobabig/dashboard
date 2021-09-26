import { DocumentData } from "firebase/firestore";
import { v4 } from "uuid";
import { setupDoc } from "../..";

export function itDeniesCreateUsingInvalidRoles(
  document: string,
  uid: string,
  incomingData: DocumentData
) {
  it.each(["read", "update", "delete", v4()])(
    `Denies '${uid}' to create '${document} using '%s' role`,
    async (role) => {
      const ref = await setupDoc(document, uid);

      await expect(
        ref.set({
          ...incomingData,
          ...{ roles: { [uid]: role } },
        })
      ).toDeny();
    }
  );
}
