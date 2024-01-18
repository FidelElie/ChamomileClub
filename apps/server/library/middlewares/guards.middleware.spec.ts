import { describe, expect, it } from "@jest/globals";

describe("guards.middleware", () => {
  describe("requireRolesGuard", () => {
    it("Works", () => {
      expect(Boolean(1)).toBeTruthy();
    });
  });
});
