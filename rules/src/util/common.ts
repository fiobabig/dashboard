import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import fs from "fs";

const rc = JSON.parse(fs.readFileSync("../.firebaserc", "utf-8")) as {
  projects: { default: string };
};

const config = JSON.parse(fs.readFileSync("../firebase.json", "utf-8")) as {
  emulators: { firestore: { port: number }; storage: { port: number } };
};

export const projectId = rc.projects.default;

process.env.FIRESTORE_EMULATOR_HOST = `localhost:${config.emulators.firestore.port}`;

export const env = await initializeTestEnvironment({
  projectId,
  storage: {
    host: "localhost",
    port: config.emulators.storage.port,
  }, // why does storage require being set here and firestore require being set in the env var??
});

export const setup = async (uid: string | undefined = undefined) => {
  let context;

  if (uid) {
    context = env.authenticatedContext(uid);
  } else {
    context = env.unauthenticatedContext();
  }

  return {
    firestore: context.firestore(),
    storage: context.storage(),
  };
};

(function hidePermissionDeniedWarnings() {
  const realConsole = console;

  global.console = {
    ...realConsole,
    warn: (...data) => {
      if (data.length === 1) {
        if (
          data.toString().includes("@firebase/firestore") &&
          data.toString().includes("PERMISSION_DENIED:")
        ) {
          return;
        }

        realConsole.warn(data);
      }
    },
  };
})();

export const uid = {
  me: "me",
  them: "them",
};
