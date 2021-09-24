import { setupData } from "../firestore";
import { itAllowsWriteForRoles } from "./allows-write-for-roles";
import { itDeniesWriteForInvalidRoles } from "./denies-write-for-invalid-roles";

export function itHandlesWriteRoles(
  collection: string,
  validData: Parameters<typeof setupData>[0]
) {
  describe(`While using roles...`, () => {
    const document = `${collection}/role-test-doc`;

    itAllowsWriteForRoles(document, validData);

    itDeniesWriteForInvalidRoles(document, validData);
  });
}
