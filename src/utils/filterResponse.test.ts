import { IFormResponses } from "../types/IApiResponse";
import { IFilterClause } from "../types/IFilterClause";
import { filterResponse } from "./filterResponse";

describe("filterResponse", () => {
  const mockData: IFormResponses = {
    responses: [
      {
        lastUpdatedAt: "2024-05-16T23:20:05.324Z",
        submissionId: "abc",
        submissionTime: "2024-05-16T23:20:05.324Z",
        questions: [
          {
            id: "nameId",
            name: "What's your name?",
            type: "ShortAnswer",
            value: "Timmy",
          },
          {
            id: "birthdayId",
            name: "What is your birthday?",
            type: "DatePicker",
            value: "2024-02-22T05:01:47.691Z",
          },
        ],
        calculations: [],
        urlParameters: [],
        quiz: {},
        documents: [],
      },
    ],
    totalResponses: 1,
    pageCount: 1,
  };
  it("should return an empty array if no responses match the filter", () => {
    const filters: IFilterClause[] = [
      {
        id: "nameId",
        condition: "equals",
        value: "Timmy",
      },
      {
        id: "birthdayId",
        condition: "greater_than",
        value: "2024-02-23T05:01:47.691Z",
      },
    ];
    const result = filterResponse({ data: mockData, filters });
    expect(result.responses).toEqual([]);
  });

  it("should return an non-empty array", () => {
    const filters: IFilterClause[] = [
      {
        id: "nameId",
        condition: "equals",
        value: "Timmy",
      },
    ];
    const result = filterResponse({ data: mockData, filters });
    expect(result.responses.length).toEqual(mockData.responses.length);
  });

  it("should return an non-empty array", () => {
    const filters: IFilterClause[] = [
      {
        id: "nameId",
        condition: "equals",
        value: "Timmy",
      },
      {
        id: "birthdayId",
        condition: "greater_than",
        value: "2024-02-11T05:01:47.691Z",
      },
    ];
    const result = filterResponse({ data: mockData, filters });
    expect(result.responses.length).toEqual(mockData.responses.length);
  });
});
