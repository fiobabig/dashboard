import { setup, uid } from "../common";

export function itDeniesByDefault() {
  it("Denies reading and writing to collections by default", async () => {
    const { firestore } = await setup(uid.anonymous);
    const ref = firestore.collection("does_not_exist");

    await expect(ref.get()).toDeny();
    await expect(ref.add({})).toDeny();
  });
}
