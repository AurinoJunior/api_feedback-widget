export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  preset: "ts-jest",
  testEnvironment: "node",
};
