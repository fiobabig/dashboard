import { uid } from "../common";
import {
  itDeniesCreateForUser,
  itDeniesDeleteForUser,
  itDeniesUpdateForUser,
} from "./common";
import {
  itAllowsReadUsingValidRoles,
  itDeniesCreateUsingInvalidRoles,
  itDeniesDeleteUsingInvalidRoles,
  itDeniesReadUsingInvalidRoles,
  itDeniesUpdateUsingInvalidRoles,
} from "./roles";

export function itHandlesReadOnlyAccess(collection: string) {
  describe("It allows read-only access for others with valid roles", () => {
    const document = `${collection}/${uid.me}`;

    itAllowsReadUsingValidRoles(document, uid.them);
    itDeniesReadUsingInvalidRoles(document, uid.them);

    itDeniesCreateForUser(document, uid.them, {});
    itDeniesCreateUsingInvalidRoles(document, uid.them, {});

    itDeniesUpdateForUser(document, uid.them, {}, {});
    itDeniesUpdateUsingInvalidRoles(document, uid.them, {}, {});

    itDeniesDeleteForUser(document, uid.them);
    itDeniesDeleteUsingInvalidRoles(document, uid.them);
  });
}
