import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Token } from "./types";

const db = admin.firestore();

export const onUpdate = functions.firestore
  .document("tokens/{token}")
  .onUpdate((change, context) => {
    const token = change.after.data() as Token;

    const batch = db.batch();

    const ownerRef = db.doc(`users/${token.ownerUid}`);
    const dashboardRef = db.doc(`dashboards/${token.dashboardUid}`);
    const tokenRef = db.doc(`tokens/${change.after.id}`);

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
        ownerId: token.ownerUid,
      },
      { merge: true }
    );

    batch.delete(tokenRef);

    batch.commit();

    return true;
  });
