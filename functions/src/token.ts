import * as admin from "firebase-admin";
import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import { Dashboard, Token } from "./types";
import { getCurrentWeather } from "./weather";

const db = admin.firestore();

export const onUpdate = functions.firestore
  .document("tokens/{token}")
  .onUpdate(async (change, context) => {
    const token = change.after.data() as Token;

    const batch = db.batch();

    const ownerRef = db.doc(`users/${token.ownerUid}`);
    const dashboardRef = db.doc(`dashboards/${token.dashboardUid}`);
    const tokenRef = db.doc(`tokens/${change.after.id}`);

    const lat = 47.63168;
    const lon = -117.23796;
    const [weather, days] = await getCurrentWeather(lat, lon);

    batch.set(
      ownerRef,
      {
        dashboards: {
          [token.dashboardUid]: {},
        },
      },
      { merge: true }
    );

    batch.set(
      dashboardRef,
      {
        ownerUid: token.ownerUid,
        weather,
        days,
        location: new firestore.GeoPoint(lat, lon),
      } as Dashboard,
      { merge: true }
    );

    batch.delete(tokenRef);

    batch.commit();

    return true;
  });
