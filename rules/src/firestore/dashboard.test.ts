import { clearFirestore } from "../util";
import { uid } from "../util/common";
import {
  itAllowsReadForUser,
  itDeniesCreateForUser,
  itDeniesDeleteForUser,
  itDeniesUpdateForUser,
} from "../util/tests/core";
import {
  itAllowsCreateUsingValidRoles,
  itAllowsDeleteUsingValidRoles,
  itAllowsReadUsingValidRoles,
  itAllowsUpdateUsingValidRoles,
} from "../util/tests/roles";

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
