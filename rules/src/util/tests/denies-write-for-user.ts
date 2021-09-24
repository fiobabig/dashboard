import { setup } from "../common";

export function itDeniesWriteForUser(uid: string, document: string, data: {}) {
  it(`Denies '${uid}' to write to '${document}'`, async () => {
    const { firestore } = await setup(uid);

    const ref = firestore.doc(document);

    await expect(ref.set(data)).toDeny();
  });
}
