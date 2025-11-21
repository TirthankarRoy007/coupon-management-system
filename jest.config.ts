import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  // Our tests live inside tests/
  testMatch: ["**/tests/**/*.test.ts"],

  // Load setup file before every test run
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],

  // Allow imports like src/...
  moduleDirectories: ["node_modules", "<rootDir>/src"],

  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
};

export default config;
