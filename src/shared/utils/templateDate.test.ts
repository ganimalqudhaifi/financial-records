import { formatDateDMY, formatDateMY, generatePeriodYM } from "./templateDate";

describe("Date formatting functions", () => {
  describe("formatDateDMY", () => {
    it("should format a valid date string to 'DD MMM YYYY'", () => {
      expect(formatDateDMY("2025-01-19")).toBe("19 Jan 2025");
    });

    it("should format a Date object to 'DD MMM YYYY'", () => {
      expect(formatDateDMY(new Date(2025, 0, 19))).toBe("19 Jan 2025"); // Month is 0-based
    });

    it("should handle invalid date inputs gracefully", () => {
      expect(formatDateDMY("Invalid Date")).toBe("NaN undefined NaN");
    });
  });

  describe("formatDateMY", () => {
    it("should format a valid date string to 'MMM YYYY'", () => {
      expect(formatDateMY("2025-01-19")).toBe("Jan 2025");
    });

    it("should format a Date object to 'MMM YYYY'", () => {
      expect(formatDateMY(new Date(2025, 0, 19))).toBe("Jan 2025"); // Month is 0-based
    });

    it("should handle invalid date inputs gracefully", () => {
      expect(formatDateMY("Invalid Date")).toBe("undefined NaN");
    });
  });

  describe("generatePeriodYM", () => {
    it("should generate a valid 'YYYY-MM' period from a date string", () => {
      expect(generatePeriodYM("2025-01-19")).toBe("2025-01");
    });

    it("should generate a valid 'YYYY-MM' period from a Date object", () => {
      expect(generatePeriodYM(new Date(2025, 0, 19))).toBe("2025-01"); // Month is 0-based
    });

    it("should handle invalid date inputs gracefully", () => {
      expect(generatePeriodYM("Invalid Date")).toBe("NaN-NaN");
    });
  });
});
