import { default as admin } from "firebase-admin";
import { env, projectId, setup } from "./common";

const db = admin
  .initializeApp({
    projectId,
  })
  .firestore();

export interface StoredData {
  [key: string]: {};
}

export async function setupData(data: StoredData) {
  for (const key in data) {
    const ref = db.doc(key);

    try {
      await ref.set(data[key]);
    } catch (err) {
      console.log(err);
    }
  }
}

export async function clearFirestore() {
  await env.clearFirestore();
}

export async function setupDoc(
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
