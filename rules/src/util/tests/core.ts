import { DocumentData } from "firebase/firestore";
import { setup } from "../common";
import { setupData, StoredData } from "../firestore";

export function itAllowsReadForUser(
  document: string,
  uid: string,
  existingData?: StoredData
) {
  it(`Allows '${uid}' to read '${document}'`, async () => {
    const ref = await doc(document, uid, existingData);

    await expect(ref.get()).toAllow();
  });
}

export function itDeniesReadForUser(
  document: string,
  uid: string,
  existingData?: StoredData
) {
  it(`Denies '${uid}' to read '${document}'`, async () => {
    const ref = await doc(document, uid, existingData);

    await expect(ref.get()).toDeny();
  });
}

export function itAllowsCreateForUser(
  document: string,
  uid: string,
  incomingData: DocumentData
) {
  it(`Allows '${uid}' to create '${document}'`, async () => {
    const ref = await doc(document, uid);

    await expect(ref.set(incomingData)).toAllow();
  });
}

export function itDeniesCreateForUser(
  document: string,
  uid: string,
  incomingData: DocumentData
) {
  it(`Denies '${uid}' to create '${document}'`, async () => {
    const ref = await doc(document, uid);

    await expect(ref.set(incomingData)).toDeny();
  });
}

export function itAllowsUpdateForUser(
  document: string,
  uid: string,
  existingData: StoredData,
  incomingData: DocumentData
) {
  it(`Allows '${uid}' to update '${document}'`, async () => {
    const ref = await doc(document, uid, existingData);

    await expect(ref.set(incomingData, { merge: true })).toAllow();
  });
}

export function itDeniesUpdateForUser(
  document: string,
  uid: string,
  existingData: StoredData,
  incomingData: DocumentData
) {
  it(`Denies '${uid}' to update '${document}'`, async () => {
    const ref = await doc(document, uid, existingData);

    await expect(ref.set(incomingData, { merge: true })).toDeny();
  });
}

export function itAllowsDeleteForUser(document: string, uid: string) {
  it(`Allows '${uid}' to delete '${document}'`, async () => {
    const ref = await doc(document, uid);

    await expect(ref.delete()).toAllow();
  });
}

export function itDeniesDeleteForUser(document: string, uid: string) {
  it(`Denies '${uid}' to delete '${document}'`, async () => {
    const ref = await doc(document, uid);

    await expect(ref.delete()).toDeny();
  });
}

export async function doc(
  document: string,
  uid: string,
  existingData?: StoredData
) {
  const { firestore } = await setup(uid);

  if (existingData) {
    await setupData(existingData);
  }

  return firestore.doc(document);
}
