import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { Token } from "./types";
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

    const [weather, days] = await getCurrentWeather(47.63168, -117.23796);

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
      },
      { merge: true }
    );

    batch.delete(tokenRef);

    batch.commit();

    return true;
  });
