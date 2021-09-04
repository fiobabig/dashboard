const {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} = require("@firebase/rules-unit-testing");
const admin = require("firebase-admin");

const projectId = "fiobabig-dashboard";

process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

const adminApp = admin.initializeApp({
  projectId,
});

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

module.exports.setup = async (uid, data) => {
  const db = adminApp.firestore();

  if (data) {
    for (const key in data) {
      const ref = db.doc(key);

      try {
        await ref.set(data[key]);
      } catch (err) {
        console.log(err, "This is me");
      }
    }
  }

  const env = await initializeTestEnvironment({
    projectId,
    storage: {
      host: "localhost",
      port: 9199,
    }, // why does this automatically pick up firestore but not storage? both emulators are defined in the firebase.json
  });

  if (uid) {
    return env.authenticatedContext(uid);
  } else {
    return env.unauthenticatedContext();
  }
};

module.exports.teardown = async () => {
  await Promise.all(firebase.apps().map((a) => a.delete())); // this maybe shouldn't exist/be done differently.  don't care atm
};

expect.extend({
  async toAllow(x) {
    let pass = false;

    try {
      await assertSucceeds(x);
      pass = true;
    } catch (err) {}

    return {
      pass,
      message: () =>
        "Expected Firebase operation to be allowed, but it was denied",
    };
  },
});

expect.extend({
  async toDeny(x) {
    let pass = false;

    try {
      await assertFails(x);
      pass = true;
    } catch (err) {}

    return {
      pass,
      message: () =>
        "Expected Firebase operation to be denied, but it was allowed",
    };
  },
});
