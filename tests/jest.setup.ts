// Ensure we are in test mode
process.env.NODE_ENV = "test";

// Reduce noisy logs unless debugging
const originalLog = console.log;
console.log = (...args) => {
  if (process.env.DEBUG_TESTS) originalLog(...args);
};

// optional: silence warnings
jest.spyOn(console, "warn").mockImplementation(() => {});
jest.spyOn(console, "error").mockImplementation(() => {});
