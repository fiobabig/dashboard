import { serverTimestamp, Timestamp } from "firebase/firestore";
import { v4 } from "uuid";
import { clearFirestore } from "../util";
import {
  itAllowsCreateForUser,
  itAllowsReadForUser,
  itAllowsUpdateForUser,
  itDeniesCreateForUser,
  itDeniesDeleteForUser,
  itDeniesReadForUser,
  itDeniesUpdateForUser,
} from "../util/access";
import { uid } from "../util/common";
import {
  itDeniesCreateIfMissingRequiredProperties,
  itDeniesUpdateIfMissingRequiredProperties,
} from "../util/validation";

describe("Firestore Rules", () => {
  afterEach(async () => await clearFirestore());

  describe("When reading a token...", () => {
    const document = `tokens/any_id`;

    itAllowsReadForUser(document, uid.me);
    itDeniesReadForUser(document, uid.unauthenticated);
  });

  describe("When creating a token...", () => {
    const document = `tokens/any_id`;
    const validToken = {
      dashboardUid: uid.me,
      createdAt: serverTimestamp(),
    }; // should really share types between the rules and functions project

    itAllowsCreateForUser(document, uid.me, validToken);

    itDeniesCreateForUser(
      document,
      uid.me,
      {
        ...validToken,
        dashboardUid: uid.them,
      },
      "Because 'dashboardUid' is not my uid"
    );

    itDeniesCreateForUser(
      document,
      uid.me,
      {
        ...validToken,
        createdAt: 0,
      },
      "Because 'createdAt' doesn't match serverTimestamp"
    );

    itDeniesCreateIfMissingRequiredProperties(document, uid.me, validToken);

    itDeniesCreateForUser(
      document,
      uid.me,
      {
        ...validToken,
        [v4()]: true,
      },
      "Because it includes a property not in the allowed list"
    );
  });

  describe("When updating a token...", () => {
    const document = `tokens/any_id`;
    const storedToken = {
      [document]: {
        dashboardUid: uid.them,
        createdAt: Timestamp.now(),
      },
    };
    const validToken = {
      ownerUid: uid.me,
    };

    itAllowsUpdateForUser(
      document,
      uid.me,
      storedToken,
      validToken,
      "Because 'ownerUid' is my uid"
    );

    itDeniesUpdateForUser(
      document,
      uid.me,
      storedToken,
      {
        ...validToken,
        ownerUid: uid.them,
      },
      "Because 'ownerUid' is not my uid"
    );

    itDeniesUpdateIfMissingRequiredProperties(
      document,
      uid.me,
      storedToken,
      validToken
    );

    itDeniesUpdateForUser(
      document,
      uid.me,
      storedToken,
      {
        ...validToken,
        [v4()]: true,
      },
      "Because it includes a property not in the allowed list"
    );
  });

  describe("When deleting a token...", () => {
    const document = `tokens/any_id`;

    describe("Since deleting should only be done by the admin sdk...", () => {
      itDeniesDeleteForUser(document, uid.me);
      itDeniesDeleteForUser(document, uid.unauthenticated);
    });
  });
});
