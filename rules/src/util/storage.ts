import { Reference } from "@firebase/storage-types";
import { env } from "./common";

const uploadedFiles: string[] = [];

export async function uploadTextFile(ref: Reference): Promise<void> {
  await ref.putString("content").then(() => uploadedFiles.push(ref.fullPath));
}

export async function clearStorage() {
  //   env.clearStorage() doesn't work because it's not recursive.
  //   it would delete files at the root level, but what the hell good is that if we're trying to test storage access rules?
  await env.withSecurityRulesDisabled(async (context) => {
    await Promise.all(
      uploadedFiles.map((a) => context.storage().ref(a).delete())
    );
  });
}
