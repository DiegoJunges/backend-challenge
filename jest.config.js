const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  clearMocks: true,
  displayName: 'loading tests',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/services/*.ts',
  ],
  coverageProvider: "v8",
  coverageReporters: [
    "text-summary",
    "lcov",
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths,{ prefix: '<rootDir>/src/' }),
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/*.spec.ts",
  ],
};
