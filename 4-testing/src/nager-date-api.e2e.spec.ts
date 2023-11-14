import axios from "axios";
import { PublicHoliday } from "./types";

interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;

  borders: CountryInfo[];
}

describe("nager-date API e2e", () => {
  let country: string;
  let API_URL: string;

  beforeEach(() => {
    API_URL = "https://date.nager.at/api/v3";
    country = "UA";
  });

  describe("/CountryInfo/{countryCode}", () => {
    let endpointURL: string;
    let fullURL: string;

    beforeEach(() => {
      endpointURL = `/CountryInfo/${country}`;
      fullURL = getFullApiURL(endpointURL);
    });

    it("should return correct basic country info", async () => {
      country = "UA";

      endpointURL = `/CountryInfo/${country}`;
      fullURL = getFullApiURL(endpointURL);

      const { data: countryInfo } = await axios.get<CountryInfo[]>(fullURL);

      expect(countryInfo).toEqual(
        expect.objectContaining({
          commonName: "Ukraine",
          officialName: "Ukraine",
          countryCode: "UA",
          region: "Europe",
        })
      );
    });

    it("should return correct information about borders", async () => {
      country = "GB";

      endpointURL = `/CountryInfo/${country}`;
      fullURL = getFullApiURL(endpointURL);

      const { data: countryInfo } = await axios.get<CountryInfo>(fullURL);

      const hasBorderWithIreland =
        countryInfo.borders.length === 1 &&
        countryInfo.borders.every(
          (borderItem: { commonName: string }) =>
            borderItem.commonName === "Ireland"
        );

      expect(hasBorderWithIreland).toBe(true);
    });
  });

  describe("/IsTodayPublicHoliday/{countryCode}", () => {
    let allPublicHolidaysEndpoint: string;
    let year: number;

    let fullEdnpoint: string;
    let todayDate: Date;

    beforeEach(() => {
      todayDate = new Date();
      year = new Date().getUTCFullYear();
      allPublicHolidaysEndpoint = getFullApiURL(
        `/PublicHolidays/${year}/${country}`
      );
      fullEdnpoint = getFullApiURL(`/IsTodayPublicHoliday/${country}`);
    });

    it("should be in sync with all public holidays available", async () => {
      const { data: publicHolidays } = await axios.get<PublicHoliday[]>(
        allPublicHolidaysEndpoint
      );
      const { status } = await axios.get<never>(fullEdnpoint); // 200: true, 204: false
      const isTodayPubliHolidayActual = status === 200;

      const isTodayPublicHolidayExpected = publicHolidays.length > 0 && publicHolidays.some((publicHoliday) => {
        const publicHolidayDate = new Date(publicHoliday.date);

        return sameDates(publicHolidayDate, todayDate);
      });

      expect(isTodayPubliHolidayActual).toBe(isTodayPublicHolidayExpected);
    });
  });

  function getFullApiURL(endpointURL: string): string {
    return `${API_URL}${endpointURL}`;
  }

  function sameDates(date1: Date, date2: Date): boolean {
    return (
      date1.getUTCFullYear() === date2.getUTCFullYear() &&
      date1.getUTCMonth() === date2.getUTCMonth() &&
      date1.getUTCDate() === date2.getUTCDate()
    );
  }
});
