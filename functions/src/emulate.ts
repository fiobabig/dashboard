import * as functions from "firebase-functions";

export const onlyOnEmulator = functions.https.onRequest(
  async (request, response) => {
    response.send("only on emulator");
  }
);
