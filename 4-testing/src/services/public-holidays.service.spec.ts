import axios, { AxiosResponse } from "axios";
import { validateInput, shortenPublicHoliday } from "../helpers";

import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "./public-holidays.service";
import { PublicHoliday } from "../types";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

jest.mock("../helpers");

describe("public-holidays.service", () => {
  let getPublicHolidayPromise: Promise<Partial<AxiosResponse<PublicHoliday[]>>>;
  let country: string;
  let year: number;

  let publicHolidays: Partial<PublicHoliday>[];

  beforeEach(() => {
    year = 2023;
    country = "Ukraine";

    getPublicHolidayPromise = Promise.resolve({ data: [] });

    (axios.get as jest.Mock).mockReturnValue(getPublicHolidayPromise);

    publicHolidays = [
      {
        name: "Public Holiday 1",
      },
      {
        name: "Public Holiday 2",
      },
      {
        name: "Public Holiday 3",
      },
    ];

    (shortenPublicHoliday as jest.Mock).mockImplementation(
      (publicHolidayItem) => {
        return {
          name: publicHolidayItem.name,
          isShorten: true,
        };
      }
    );

    getPublicHolidayPromise = Promise.resolve({
      data: publicHolidays as PublicHoliday[],
    });

    (axios.get as jest.Mock).mockReturnValue(getPublicHolidayPromise);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getListOfPublicHolidays", () => {
    it("should validate input", async () => {
      await getListOfPublicHolidays(year, country);

      expect(validateInput).toHaveBeenCalledWith({ year, country });
    });

    it("should request public holidays for correct year and country", async () => {
      await getListOfPublicHolidays(year, country);

      const expectedURL = `https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`;

      expect(axios.get).toHaveBeenCalledWith(expectedURL);
    });

    it("should shorten received public holidays", async () => {
      const actualResult = await getListOfPublicHolidays(year, country);

      const expectedResult = [
        {
          name: "Public Holiday 1",
          isShorten: true,
        },
        {
          name: "Public Holiday 2",
          isShorten: true,
        },
        {
          name: "Public Holiday 3",
          isShorten: true,
        },
      ];

      expect(actualResult).toEqual(expectedResult);
    });

    it("should return an empty list when error while fetching", async () => {
      (axios.get as jest.Mock).mockReturnValue(
        Promise.reject(new Error("error"))
      );

      const actualResult = await getListOfPublicHolidays(year, country);
      const expectedResult: PublicHoliday[] = [];

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe("checkIfTodayIsPublicHoliday", () => {
    let responseMockObject: { status?: number };

    beforeEach(() => {
      responseMockObject = { status: 200 };

      getPublicHolidayPromise = Promise.resolve(responseMockObject);
      (axios.get as jest.Mock).mockReturnValue(getPublicHolidayPromise);
    });

    it("should validate input", async () => {
      await checkIfTodayIsPublicHoliday(country);

      expect(validateInput).toHaveBeenCalledWith({ country });
    });

    it("should check if today is a public holiday for correct country", async () => {
      await checkIfTodayIsPublicHoliday(country);

      const expectedURL = `https://date.nager.at/api/v3/IsTodayPublicHoliday/${country}`;

      expect(axios.get).toHaveBeenCalledWith(expectedURL);
    });

    it("today should be a public holiday when there is a successfull request", async () => {
      const actualResult = await checkIfTodayIsPublicHoliday(country);

      expect(actualResult).toBe(true);
    });

    it("today should NOT be a public holiday when there is a unsuccessfull request", async () => {
      responseMockObject.status = 302;

      const actualResult = await checkIfTodayIsPublicHoliday(country);

      expect(actualResult).toBe(false);
    });

    it("today should NOT be a public holiday error occurs when fetching", async () => {
      (axios.get as jest.Mock).mockReturnValue(
        Promise.reject(new Error("error"))
      );

      const actualResult = await checkIfTodayIsPublicHoliday(country);

      expect(actualResult).toBe(false);
    });
  });

  describe("getNextPublicHolidays", () => {
    it("should validate input", async () => {
      await getNextPublicHolidays(country);

      expect(validateInput).toHaveBeenCalledWith({ country });
    });

    it("should request next public holiday for correct country", async () => {
      await getNextPublicHolidays(country);

      const expectedURL = `https://date.nager.at/api/v3/NextPublicHolidays/${country}`;

      expect(axios.get).toHaveBeenCalledWith(expectedURL);
    });

    it("should shorten received public holidays", async () => {
      const actualResult = await getNextPublicHolidays(country);

      const expectedResult = [
        {
          name: "Public Holiday 1",
          isShorten: true,
        },
        {
          name: "Public Holiday 2",
          isShorten: true,
        },
        {
          name: "Public Holiday 3",
          isShorten: true,
        },
      ];

      expect(actualResult).toEqual(expectedResult);
    });

    it("should return an empty list when error while fetching", async () => {
      (axios.get as jest.Mock).mockReturnValue(
        Promise.reject(new Error("error"))
      );

      const actualResult = await getNextPublicHolidays(country);
      const expectedResult: PublicHoliday[] = [];

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
