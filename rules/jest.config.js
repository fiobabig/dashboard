export default {
  transform: {},
  coverageProvider: "v8",
  testEnvironment: "node",
  preset: "ts-jest/presets/default-esm",
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  setupFiles: ["./src/util/common.ts"],
  setupFilesAfterEnv: ["./src/util/expect.ts"],
};
