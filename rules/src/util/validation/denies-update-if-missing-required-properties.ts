import { DocumentData } from "@firebase/firestore";
import { StoredData } from "..";
import { itDeniesUpdateForUser } from "../access";

export function itDeniesUpdateIfMissingRequiredProperties(
  document: string,
  uid: string,
  storedData: StoredData,
  validData: DocumentData
) {
  Object.keys(validData).forEach((key) => {
    const token: { [key: string]: any } = { ...validData };
    delete token[key];

    itDeniesUpdateForUser(
      document,
      uid,
      storedData,
      token,
      `Because '${key}' is required, but is missing`
    );
  });
}
