import { clearFirestore } from "../util";
import { itHandlesOwnerAccess } from "../util/access/handles-owner-access";
import { itHandlesReadOnlyAccess } from "../util/access/handles-read-only-access";

describe("Firestore Rules", () => {
  afterEach(async () => await clearFirestore());

  describe("When accessing a user...", () => {
    const collection = "users";

    itHandlesOwnerAccess(collection);
    itHandlesReadOnlyAccess(collection);
  });
});
