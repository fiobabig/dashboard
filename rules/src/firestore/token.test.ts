import { clearFirestore } from "../util";
import { itAllowsReadForUser, itDeniesReadForUser } from "../util/access";
import { uid } from "../util/common";

describe("Firestore Rules", () => {
  afterEach(async () => await clearFirestore());

  describe("When reading a token...", () => {
    const document = `tokens/any_id`;

    itAllowsReadForUser(document, uid.me);
    itDeniesReadForUser(document, uid.anonymous);
  });
});
