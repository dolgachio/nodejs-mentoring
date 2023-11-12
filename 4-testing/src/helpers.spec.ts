import { shortenPublicHoliday, validateInput } from "./helpers";
import { PublicHoliday, PublicHolidayShort } from "./types";

describe("helpers", () => {
  let country: string;
  let year: number;

  beforeEach(() => {
    let yearDate = new Date();
    year = yearDate.getFullYear();
    country = "GB";
  });

  describe("validateInput", () => {
    let validateInputParams: { year?: number; country?: string };

    describe("when nothing provided", () => {
      beforeEach(() => {
        validateInputParams = {};
      });

      it("should be valid", () => {
        expect(validateInput(validateInputParams)).toBe(true);
      });
    });

    describe("when only country provided", () => {
      it("should be valid when it is a supported country", () => {
        validateInputParams = { country };

        expect(validateInput(validateInputParams)).toBe(true);
      });

      it("should throw an expected error when it is not a supported country", () => {
        const unsupportedCountry = "Some Country";
        validateInputParams = { country: unsupportedCountry };
        const expectedError = new Error(
          `Country provided is not supported, received: ${unsupportedCountry}`
        );

        expect(() => validateInput(validateInputParams)).toThrow(expectedError);
      });
    });

    describe("when only year provided", () => {
      it("should be valid when it is a current year", () => {
        validateInputParams = { year };

        expect(validateInput(validateInputParams)).toBe(true);
      });

      it("should throw an expected error when it is not a current year", () => {
        const someYear = 1970;

        validateInputParams = { year: someYear };
        const expectedError = new Error(
          `Year provided not the current, received: ${someYear}`
        );

        expect(() => validateInput(validateInputParams)).toThrow(expectedError);
      });
    });

    describe("when both country and year are provided", () => {
      it("should be valid when they both valid", () => {
        validateInputParams = { year, country };

        expect(validateInput(validateInputParams)).toBe(true);
      });

      it("should throw an expected error when it is not a supported country", () => {
        const unsupportedCountry = "Some Country";
        validateInputParams = { country: unsupportedCountry, year };
        const expectedError = new Error(
          `Country provided is not supported, received: ${unsupportedCountry}`
        );

        expect(() => validateInput(validateInputParams)).toThrow(expectedError);
      });

      it("should throw an expected error when it is not a current year", () => {
        const someYear = 1970;

        validateInputParams = { country, year: someYear };
        const expectedError = new Error(
          `Year provided not the current, received: ${someYear}`
        );

        expect(() => validateInput(validateInputParams)).toThrow(expectedError);
      });
    });
  });

  describe("shortenPublicHoliday", () => {
    let publicHoliday: Partial<PublicHoliday>;

    beforeEach(() => {
      publicHoliday = {
        name: "Public Holiday",
        localName: "Local Public Holiday",
        date: "some date",
        fixed: true,
        global: false,
      };
    });

    it("should shorten public holiday", () => {
      const expectedResult: PublicHolidayShort = {
        name: "Public Holiday",
        localName: "Local Public Holiday",
        date: "some date",
      };

      expect(shortenPublicHoliday(publicHoliday as PublicHoliday)).toEqual(
        expectedResult
      );
    });
  });
});
