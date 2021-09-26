import { clearFirestore } from "../util";
import { itDeniesByDefault } from "../util/access";

describe("Firestore Rules", () => {
  afterEach(async () => await clearFirestore());

  itDeniesByDefault();
});
