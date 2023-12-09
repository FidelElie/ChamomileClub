import { describe, expect, it } from "@jest/globals";

describe("guards.middleware", () => {
  describe("requireRolesGuard", () => {
    it("Works", () => {
      expect(1 === 1).toBeTruthy();
    });
  });
});
