import { setup } from "../common";

export function itDeniesByDefault() {
  it("Denies reading and writing by default", async () => {
    const { firestore } = await setup();
    const ref = firestore.collection("does-not-exist");

    await expect(ref.get()).toDeny();
    await expect(ref.add({})).toDeny();
  });
}
