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
    itAllowsReadUsingValidRoles(document, uid.them);

    itDeniesCreateForUser(document, uid.them, {});
    itAllowsCreateUsingValidRoles(document, uid.them, {});

    itDeniesUpdateForUser(document, uid.them, {}, {});
    itAllowsUpdateUsingValidRoles(document, uid.them, {}, {});

    itDeniesDeleteForUser(document, uid.them);
    itAllowsDeleteUsingValidRoles(document, uid.them);
  });
});
