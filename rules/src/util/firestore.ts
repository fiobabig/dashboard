import { Timestamp } from "@firebase/firestore";
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
    const value = fixDates(data[key]);

    try {
      await ref.set(value);
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

const fixDates = (document: { [key: string]: any }) => {
  for (var key in document) {
    const val = document[key];

    if (val instanceof Timestamp) {
      document[key] = new admin.firestore.Timestamp(
        val.seconds,
        val.nanoseconds
      );
    }

    if (val != null && val.constructor === Object) {
      fixDates(val);
    }
  }
  return document;
};
