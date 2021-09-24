import { setupData } from "../firestore";
import { itAllowsDeleteForRoles } from "./allows-delete-for-roles";
import { itAllowsReadForRoles } from "./allows-read-for-roles";
import { itAllowsWriteForRoles } from "./allows-write-for-roles";
import { itDeniesDeleteForInvalidRoles } from "./denies-delete-for-invalid-roles";
import { itDeniesReadWithoutRole } from "./denies-read-without-role";
import { itDeniesWriteForInvalidRoles } from "./denies-write-for-invalid-roles";

export function itRequiresRoles(
  collection: string,
  validData: Parameters<typeof setupData>[0]
) {
  describe(`While using roles...`, () => {
    const document = `${collection}/role-test-doc`;

    itDeniesReadWithoutRole(document);

    itAllowsReadForRoles(document);

    itAllowsWriteForRoles(document, validData);

    itDeniesWriteForInvalidRoles(document, validData);

    itAllowsDeleteForRoles(document);

    itDeniesDeleteForInvalidRoles(document);
  });
}
