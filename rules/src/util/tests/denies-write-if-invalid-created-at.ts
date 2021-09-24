import { setup, uid } from "../common";

export function itDeniesWriteIfInvalidCreatedAt(
  document: string,
  validData: {}
) {
  it("Denies write if invalid createdAt timestamp", async () => {
    const { firestore } = await setup(uid.me);

    const ref = firestore.doc(document);

    await expect(
      ref.set({
        ...validData,
        createdAt: 0,
      })
    ).toDeny();
  });
}
