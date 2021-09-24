import { setup, uid } from "../common";

export function itDeniesWriteIfMissingRequiredValue(
  document: string,
  validData: {}
) {
  it.each(Object.keys(validData))(
    "Denies write if missing '%s'",
    async (key) => {
      const { firestore } = await setup(uid.me);

      const ref = firestore.doc(document);

      const value: { [key: string]: any } = { ...validData };
      delete value[key];

      await expect(ref.set(value)).toDeny();
    }
  );
}
