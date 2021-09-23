import { assertFails, assertSucceeds } from "@firebase/rules-unit-testing";

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
