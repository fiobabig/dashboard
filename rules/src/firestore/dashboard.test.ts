import { clearFirestore } from "../util";
import {
  itAllowsCreateUsingValidRoles,
  itAllowsDeleteUsingValidRoles,
  itAllowsReadForUser,
  itAllowsReadUsingValidRoles,
  itAllowsUpdateUsingValidRoles,
  itDeniesCreateForUser,
  itDeniesDeleteForUser,
  itDeniesUpdateForUser,
} from "../util/access";
import { uid } from "../util/common";

describe("Firestore Rules", () => {
  afterEach(async () => await clearFirestore());

  describe("When accessing a dashboard...", () => {
    const document = `dashboards/${uid.me}`;

    itAllowsReadForUser(document, uid.me);
    itAllowsReadUsingValidRoles(document, uid.me);

    itDeniesCreateForUser(document, uid.me, {});
    itAllowsCreateUsingValidRoles(document, uid.me, {});

    itDeniesUpdateForUser(document, uid.me, {}, {});
    itAllowsUpdateUsingValidRoles(document, uid.me, {}, {});

    itDeniesDeleteForUser(document, uid.me);
    itAllowsDeleteUsingValidRoles(document, uid.me);
  });
});
