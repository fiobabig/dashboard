import { uid } from "../common";
import {
  itAllowsCreateForUser,
  itAllowsDeleteForUser,
  itAllowsReadForUser,
  itAllowsUpdateForUser,
  itDeniesCreateForUser,
  itDeniesDeleteForUser,
  itDeniesReadForUser,
  itDeniesUpdateForUser,
} from "./common";

export function itHandlesOwnerAccess(collection: string) {
  describe("It allows owner access while denying others", () => {
    const document = `${collection}/${uid.me}`;

    itAllowsReadForUser(document, uid.me);
    itAllowsCreateForUser(document, uid.me, {});
    itAllowsUpdateForUser(document, uid.me, {}, {});
    itAllowsDeleteForUser(document, uid.me);

    itDeniesReadForUser(document, uid.them);
    itDeniesCreateForUser(document, uid.them, {});
    itDeniesUpdateForUser(document, uid.them, {}, {});
    itDeniesDeleteForUser(document, uid.them);
  });
}
