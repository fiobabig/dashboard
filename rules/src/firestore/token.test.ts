import { clearFirestore } from "../util";
import { uid } from "../util/common";
import { itAllowsReadForUser, itDeniesReadForUser } from "../util/tests/core";

describe("Firestore Rules", () => {
  afterEach(async () => await clearFirestore());

  describe("When reading a token...", () => {
    const document = `tokens/any_id`;

    itAllowsReadForUser(document, uid.me);
    itDeniesReadForUser(document, uid.anonymous);
  });
});
