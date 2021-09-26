import { setupDoc, StoredData } from "../../firestore";

export function itDeniesReadUsingInvalidRoles(
  document: string,
  uid: string,
  existingData?: StoredData
) {
  it.each(["create", "update", "delete"])(
    `Denies '${uid}' to read '${document} using '%s' role`,
    async (role) => {
      const ref = await setupDoc(document, uid, {
        ...existingData,
        ...{ [document]: { roles: { [uid]: role } } },
      });

      await expect(ref.get()).toDeny();
    }
  );
}
