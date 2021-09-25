import { DocumentData } from "firebase/firestore";
import { v4 } from "uuid";
import { StoredData } from "../firestore";
import { doc } from "./core";

export function itAllowsReadUsingValidRoles(
  document: string,
  uid: string,
  existingData?: StoredData
) {
  it.each(["read", "edit", "admin"])(
    `Allows '${uid}' to read '${document} using '%s' role`,
    async (role) => {
      const ref = await doc(document, uid, {
        ...existingData,
        ...{ [document]: { roles: { [uid]: role } } },
      });

      await expect(ref.get()).toAllow();
    }
  );
}

export function itAllowsCreateUsingValidRoles(
  document: string,
  uid: string,
  incomingData: DocumentData
) {
  it.each(["create", "edit", "admin"])(
    `Allows '${uid}' to create '${document} using '%s' role`,
    async (role) => {
      const ref = await doc(document, uid);

      await expect(
        ref.set({
          ...incomingData,
          ...{ roles: { [uid]: role } },
        })
      ).toAllow();
    }
  );
}

export function itAllowsUpdateUsingValidRoles(
  document: string,
  uid: string,
  existingData: StoredData,
  incomingData: DocumentData
) {
  it.each(["update", "edit", "admin"])(
    `Allows '${uid}' to update '${document} using '%s' role`,
    async (role) => {
      const ref = await doc(document, uid, {
        ...existingData,
        ...{ [document]: { roles: { [uid]: role } } },
      });

      await expect(ref.set(incomingData)).toAllow();
    }
  );
}

export function itAllowsDeleteUsingValidRoles(document: string, uid: string) {
  it.each(["delete", "admin"])(
    `Allows '${uid}' to delete '${document} using '%s' role`,
    async (role) => {
      const ref = await doc(document, uid, {
        [document]: { roles: { [uid]: role } },
      });

      await expect(ref.delete()).toAllow();
    }
  );
}

export function itDeniesReadUsingInvalidRoles(
  document: string,
  uid: string,
  existingData?: StoredData
) {
  it.each(["create", "update", "delete"])(
    `Denies '${uid}' to read '${document} using '%s' role`,
    async (role) => {
      const ref = await doc(document, uid, {
        ...existingData,
        ...{ [document]: { roles: { [uid]: role } } },
      });

      await expect(ref.get()).toDeny();
    }
  );
}

export function itDeniesCreateUsingInvalidRoles(
  document: string,
  uid: string,
  incomingData: DocumentData
) {
  it.each(["read", "update", "delete", v4()])(
    `Denies '${uid}' to create '${document} using '%s' role`,
    async (role) => {
      const ref = await doc(document, uid);

      await expect(
        ref.set({
          ...incomingData,
          ...{ roles: { [uid]: role } },
        })
      ).toDeny();
    }
  );
}

export function itDeniesUpdateUsingInvalidRoles(
  document: string,
  uid: string,
  existingData: StoredData,
  incomingData: DocumentData
) {
  it.each(["read", "create", "delete", v4()])(
    `Denies '${uid}' to update '${document} using '%s' role`,
    async (role) => {
      const ref = await doc(document, uid, {
        ...existingData,
        ...{ [document]: { roles: { [uid]: role } } },
      });

      await expect(ref.set(incomingData)).toDeny();
    }
  );
}

export function itDeniesDeleteUsingInvalidRoles(document: string, uid: string) {
  it.each(["read", "create", "update", "edit", v4()])(
    `Denies '${uid}' to delete '${document} using '%s' role`,
    async (role) => {
      const ref = await doc(document, uid, {
        [document]: { roles: { [uid]: role } },
      });

      await expect(ref.delete()).toDeny();
    }
  );
}
