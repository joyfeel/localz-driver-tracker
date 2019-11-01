module.exports = {
  verbose: false,
  testURL: "http://localhost/",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test-db-setup.js"],
  testPathIgnorePatterns: [
    "dist/"
  ],
  restoreMocks: true
}