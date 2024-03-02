import { IFormResponses, ResponseItem } from "../types/IApiResponse";
import { IFilterClause } from "../types/IFilterClause";
import moment from "moment";

interface IParams {
  data: IFormResponses;
  filters: IFilterClause[];
}

const compareValues = (item: ResponseItem | undefined, filter: IFilterClause) => {
  if (!item || item.value === undefined) return false;
  if (item.type === "DatePicker") {
    switch (filter.condition) {
      case "equals":
        return moment(item.value).isSame(filter.value);
      case "does_not_equal":
        return !moment(item.value).isSame(filter.value);
      case "greater_than":
        return moment(item.value).isAfter(filter.value);
      case "less_than":
        return moment(item.value).isBefore(filter.value);
      default:
        return false;
    }
  } else {
    switch (filter.condition) {
      case "equals":
        return item.value === filter.value;
      case "does_not_equal":
        return item.value !== filter.value;
      case "greater_than":
        return item.value > filter.value;
      case "less_than":
        return item.value < filter.value;
      default:
        return false;
    }
  }
};

export const filterResponse = ({ data, filters }: IParams) => {
  try {
    const filteredResponses = data.responses.filter((response) => {
      return filters.every((filter) => {
        const items = [
          response.questions.find((question) => question.id === filter.id),
          response.calculations.find((calculation) => calculation.id === filter.id),
          response.urlParameters.find((urlParameter) => urlParameter.id === filter.id),
          response.documents.find((document) => document.id === filter.id),
        ];
        return items.some((item) => compareValues(item, filter));
      });
    });
    return {
      responses: filteredResponses,
      totalResponses: filteredResponses.length,
      pageCount: Math.ceil(filteredResponses.length / 150),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Problem with filtering responses");
  }
};
// "[{\"id\":\"nameId\",\"condition\":\"equals\",\"value\":\"Timmy\"},{\"id\":\"birthdayId\",\"condition\":\"greater_than\",\"value\":\"2024-02-23T05:01:47.691Z\"}]"
// "[{\"id\":\"bE2Bo4cGUv49cjnqZ4UnkW\",\"condition\":\"equals\",\"value\":\"Johnny\"}]"
// "[{\"id\":\"bE2Bo4cGUv49cjnqZ4UnkW\",\"condition\":\"equals\",\"value\":\"Johnny\"},{\"id\":\"dSRAe3hygqVwTpPK69p5td\",\"condition\":\"greater_than\",\"value\":\"2024-01-23T05:01:47.691Z\"}]"
// "[{\"id\":\"bE2Bo4cGUv49cjnqZ4UnkW\",\"condition\":\"equals\",\"value\":\"Johnny\"},{\"id\":\"dSRAe3hygqVwTpPK69p5td\",\"condition\":\"greater_than\",\"value\":\"2024-03-23T05:01:47.691Z\"}]"

// {
//   "responses": [
//     {
//       "submissionId": "ab9959b2-73e8-4994-85b9-56e780b89ce3",
//       "submissionTime": "2024-02-27T19:37:08.228Z",
//       "lastUpdatedAt": "2024-02-27T19:37:08.228Z",
//       "questions": [
//         {
//           "id": "4KC356y4M6W8jHPKx9QfEy",
//           "name": "Anything else you'd like to share before your call?",
//           "type": "LongAnswer",
//           "value": "Nothing much to share yet!"
//         },
//         {
//           "id": "bE2Bo4cGUv49cjnqZ4UnkW",
//           "name": "What is your name?",
//           "type": "ShortAnswer",
//           "value": "Johnny"
//         },
//         {
//           "id": "dSRAe3hygqVwTpPK69p5td",
//           "name": "Please select a date to schedule your yearly check-in.",
//           "type": "DatePicker",
//           "value": "2024-02-01"
//         },
//         {
//           "id": "fFnyxwWa3KV6nBdfBDCHEA",
//           "name": "How many employees work under you?",
//           "type": "NumberInput",
//           "value": 2
//         },
//         {
//           "id": "jB2qDRcXQ8Pjo1kg3jre2J",
//           "name": "Which department do you work in?",
//           "type": "MultipleChoice",
//           "value": "Engineering"
//         },
//         {
//           "id": "kc6S6ThWu3cT5PVZkwKUg4",
//           "name": "What is your email?",
//           "type": "EmailInput",
//           "value": "johnny@fillout.com"
//         }
//       ],
//       "calculations": [],
//       "urlParameters": [],
//       "quiz": {},
//       "documents": []
//     }
//   ],
//   "totalResponses": 6,
//   "pageCount": 6
// }
