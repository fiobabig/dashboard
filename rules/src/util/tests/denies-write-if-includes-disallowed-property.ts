import { setup, uid } from "../common";

export function itDeniesWriteIfIncludesDisallowedProperty(
  document: string,
  validData: {}
) {
  it("Denies write if disallowed property", async () => {
    const { firestore } = await setup(uid.me);

    const ref = firestore.doc(document);

    await expect(
      ref.set({
        ...validData,
        invalid: "I am not allowed",
      })
    ).toDeny();
  });
}
