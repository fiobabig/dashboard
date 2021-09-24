import { default as admin } from "firebase-admin";
import { env, projectId } from "./common";

const db = admin
  .initializeApp({
    projectId,
  })
  .firestore();

export async function setupData(
  data: {
    [key: string]: {};
  }
) {
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
