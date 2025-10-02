import { describe, it, expect } from "bun:test"
import { Application } from "../src/Application"

// Feel free to use this test file to try out your objects.
// You can even test-drive them, if you wish!
// Run `bun test --watch` in the terminal to run the tests.

it("works", () => {
  expect(1 + 1).toBe(2);
});

describe("Application", () => {
  it("refuses to construct without id and receivedDateTime", () => {
    expect(() => new Application(null as any, null as any)).toThrow();
  });
});
