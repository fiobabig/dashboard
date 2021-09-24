import { setup } from "../common";

export function itAllowsWriteForUser(uid: string, document: string, data: {}) {
  it(`Allows '${uid}' to write to '${document}'`, async () => {
    const { firestore } = await setup(uid);

    const ref = firestore.doc(document);

    await expect(ref.set(data)).toAllow();
  });
}
