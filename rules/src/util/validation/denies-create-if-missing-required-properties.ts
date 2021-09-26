import { DocumentData } from "@firebase/firestore";
import { itDeniesCreateForUser } from "../access";

export function itDeniesCreateIfMissingRequiredProperties(
  document: string,
  uid: string,
  validData: DocumentData
) {
  Object.keys(validData).forEach((key) => {
    const token: { [key: string]: any } = { ...validData };
    delete token[key];

    itDeniesCreateForUser(
      document,
      uid,
      token,
      `Because '${key}' is required, but is missing`
    );
  });
}
