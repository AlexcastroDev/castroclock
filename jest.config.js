const TEST_FILES_REGEX = '(/test/.*|(\\.|/)(test|spec))\\.ts$';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    "**/*.spec.ts",
    "!**/*.mocks.ts",
    "!**/node_modules/**",
    "!**/lib/**",
  ],
  testRegex: TEST_FILES_REGEX
};