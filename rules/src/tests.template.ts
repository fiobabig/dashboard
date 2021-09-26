import { clearFirestore } from "./util";
import {
  itAllowsCreateForUser,
  itAllowsCreateUsingValidRoles,
  itAllowsDeleteForUser,
  itAllowsDeleteUsingValidRoles,
  itAllowsReadForUser,
  itAllowsReadUsingValidRoles,
  itAllowsUpdateForUser,
  itAllowsUpdateUsingValidRoles,
  itDeniesCreateForUser,
  itDeniesCreateUsingInvalidRoles,
  itDeniesDeleteForUser,
  itDeniesDeleteUsingInvalidRoles,
  itDeniesReadForUser,
  itDeniesReadUsingInvalidRoles,
  itDeniesUpdateForUser,
  itDeniesUpdateUsingInvalidRoles,
} from "./util/access";
import { uid } from "./util/common";

describe("Template Rules", () => {
  afterEach(async () => await clearFirestore());
  describe("When accessing 'owner_only'...", () => {
    const document = `owner_only/${uid.me}`;

    itAllowsReadForUser(document, uid.me);
    itAllowsCreateForUser(document, uid.me, {});
    itAllowsUpdateForUser(document, uid.me, {}, {});
    itAllowsDeleteForUser(document, uid.me);

    itDeniesReadForUser(document, uid.them);
    itDeniesCreateForUser(document, uid.them, {});
    itDeniesUpdateForUser(document, uid.them, {}, {});
    itDeniesDeleteForUser(document, uid.them);
  });

  describe("When accessing 'roles_only'...", () => {
    const document = `roles_only/${uid.me}`;

    itAllowsReadUsingValidRoles(document, uid.me);
    itAllowsCreateUsingValidRoles(document, uid.me, {});
    itAllowsUpdateUsingValidRoles(document, uid.me, {}, {});
    itAllowsDeleteUsingValidRoles(document, uid.me);

    itDeniesReadForUser(document, uid.me);
    itDeniesCreateForUser(document, uid.me, {});
    itDeniesUpdateForUser(document, uid.me, {}, {});
    itDeniesDeleteForUser(document, uid.me);

    itDeniesReadUsingInvalidRoles(document, uid.me);
    itDeniesCreateUsingInvalidRoles(document, uid.me, {});
    itDeniesUpdateUsingInvalidRoles(document, uid.me, {}, {});
    itDeniesDeleteUsingInvalidRoles(document, uid.me);
  });

  describe("When accessing 'owner_or_readonly'...", () => {
    const document = `owner_or_readonly/${uid.me}`;

    itAllowsReadForUser(document, uid.me);
    itAllowsCreateForUser(document, uid.me, {});
    itAllowsUpdateForUser(document, uid.me, {}, {});
    itAllowsDeleteForUser(document, uid.me);

    itAllowsReadUsingValidRoles(document, uid.them);
    itDeniesReadUsingInvalidRoles(document, uid.them);

    itDeniesCreateForUser(document, uid.them, {});
    itDeniesCreateUsingInvalidRoles(document, uid.them, {});

    itDeniesUpdateForUser(document, uid.them, {}, {});
    itDeniesUpdateUsingInvalidRoles(document, uid.them, {}, {});

    itDeniesDeleteForUser(document, uid.them);
    itDeniesDeleteUsingInvalidRoles(document, uid.them);
  });
});
