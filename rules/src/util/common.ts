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

export const setup = async (uid: string) => {
  let context;

  if (uid == _uid.unauthenticated) {
    context = env.unauthenticatedContext();
  } else {
    context = env.authenticatedContext(uid);
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

const _uid = {
  me: "me",
  them: "them",
  unauthenticated: "unauthenticated",
};
export const uid = _uid;

export function describeIt(
  message: string,
  reason: string | undefined,
  body: () => Promise<void>
) {
  if (reason != null) {
    describe(`${message}...`, () => {
      it(reason, body);
    });
  } else {
    it(message, body);
  }
}
