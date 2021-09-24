import { setup } from "../common";

export function itAllowsReadForUser(uid: string, document: string) {
  it(`Allows '${uid}' to write to '${document}'`, async () => {
    const { firestore } = await setup(uid);

    const ref = firestore.doc(document);

    await expect(ref.get()).toAllow();
  });
}
