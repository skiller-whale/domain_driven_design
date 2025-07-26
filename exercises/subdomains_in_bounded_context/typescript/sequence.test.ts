import { describe, it, expect } from "bun:test";

describe("Application", () => {
  describe("when an application tests 80% and has an interview score of 9", () => {
    // Example test that should have 80% score: 2 poor, 0 fine, 8 good, 0 great
    // Example interview that should have 9 score: 5 communication, 4 competence
    it.todo("passes");
  });

  describe("when an application tests under 80% and has an interview score of 9", () => {
    // Example test that should have 75% score: 0 poor, 5 fine, 5 good, 0 great
    // Example interview that should have 9 score: 5 communication, 4 competence
    it.todo("fails");
  });

  describe("when an application tests 80% and has an interview score of under 9", () => {
    // Example test that should have 80% score: 2 poor, 0 fine, 8 good, 0 great
    // Example interview that should have 8 score: 4 communication, 4 competence
    it.todo("fails");
  });
});

describe("ApplicationRepository", () => {
  it.todo("persists and retrieves applications", () => {
    // 1. Persist an application
    // 2. Retrieve the application
    // 3. Assert that the persisted and retrieved applications are equal
  });
});
