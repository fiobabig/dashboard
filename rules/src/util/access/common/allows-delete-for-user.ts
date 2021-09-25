import { setupDoc } from "../..";

export function itAllowsDeleteForUser(document: string, uid: string) {
  it(`Allows '${uid}' to delete '${document}'`, async () => {
    const ref = await setupDoc(document, uid);

    await expect(ref.delete()).toAllow();
  });
}
