import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getCurrentWeather } from "./weather";
import { firestore } from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

export const updateWeather = functions.https.onRequest(
  async (request, response) => {
    const data = await db.collection("users").orderBy("location").get();

    for (const doc of data.docs) {
      const location: firestore.GeoPoint = doc.data().location;

      const current = await getCurrentWeather(
        location.latitude,
        location.longitude
      );

      await db.doc(`users/${doc.id}`).set(
        {
          weather: {
            current,
          },
        },
        { merge: true }
      );
    }

    response.send("Done");
  }
);
