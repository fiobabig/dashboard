import { setupData } from "../firestore";
import { itAllowsReadForRoles } from "./allows-read-for-roles";
import { itDeniesDeleteForInvalidRoles } from "./denies-delete-for-invalid-roles";
import { itDeniesWriteForInvalidRoles } from "./denies-write-for-invalid-roles";

export function itHandlesReadOnlyRoles(
  document: string,
  validData: Parameters<typeof setupData>[0]
) {
  describe(`While using roles...`, () => {
    itAllowsReadForRoles(document);

    itDeniesWriteForInvalidRoles(document, validData);

    itDeniesDeleteForInvalidRoles(document);
  });
}
