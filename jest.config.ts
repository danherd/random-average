import type { JestConfigWithTsJest } from "ts-jest";

process.env["LOG_LEVEL"] = "debug";

const config: JestConfigWithTsJest = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
    "^@(handlers|services|stores|utils)/(.*)$": "<rootDir>/src/$1/$2",
    "^@types$": "rootDir>/src/types",
  },
  preset: "ts-jest",
  testEnvironment: "node",
};

export default config;
