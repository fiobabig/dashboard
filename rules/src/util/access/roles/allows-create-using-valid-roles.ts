import { DocumentData } from "firebase/firestore";
import { setupDoc } from "../..";

export function itAllowsCreateUsingValidRoles(
  document: string,
  uid: string,
  incomingData: DocumentData
) {
  it.each(["create", "edit", "admin"])(
    `Allows '${uid}' to create '${document} using '%s' role`,
    async (role) => {
      const ref = await setupDoc(document, uid);

      await expect(
        ref.set({
          ...incomingData,
          ...{ roles: { [uid]: role } },
        })
      ).toAllow();
    }
  );
}
