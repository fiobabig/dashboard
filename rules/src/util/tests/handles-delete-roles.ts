import { itAllowsDeleteForRoles } from "./allows-delete-for-roles";
import { itDeniesDeleteForInvalidRoles } from "./denies-delete-for-invalid-roles";

export function itHandlesDeleteRoles(collection: string) {
  describe(`While using roles...`, () => {
    const document = `${collection}/role-test-doc`;

    itAllowsDeleteForRoles(document);

    itDeniesDeleteForInvalidRoles(document);
  });
}
