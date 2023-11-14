import {
  getListOfPublicHolidays,
} from "./public-holidays.service";
import { SUPPORTED_COUNTRIES } from "../config";

describe("public-holidays.service INTEGRATION", () => {
  let country: string;
  let year: number;

  beforeEach(() => {
    year = (new Date().getFullYear());
    country = SUPPORTED_COUNTRIES[0];
  });

  describe("getListOfPublicHolidays", () => {

    it("public holidays should exist and have properties with data", async () => {
      const actualPublicHolidays = await getListOfPublicHolidays(year, country);
      const notEmpty = !!actualPublicHolidays.length;
      const allPublicHolidaysFilledWithData = notEmpty && actualPublicHolidays.every((holiday) => {
        return !!holiday.date && !!holiday.localName && !! holiday.name;
      });

      expect(allPublicHolidaysFilledWithData).toBe(true);  
    });

    it("should all holidays have correct year", async () => {
      const actualPublicHolidays = await getListOfPublicHolidays(year, country);
      const notEmpty = !!actualPublicHolidays.length;
      const allPublicHolidaysHaveCorrectYear = notEmpty && actualPublicHolidays.every((holiday) => {
        return (new Date()).getFullYear() === year;
      });

      expect(allPublicHolidaysHaveCorrectYear).toBe(true);
    });
  
  });
});
