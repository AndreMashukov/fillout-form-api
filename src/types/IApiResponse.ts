/* eslint-disable @typescript-eslint/no-explicit-any */
export type ResponseItem = {
  id: string;
  name: string;
  type?: string;
  value?: string | number;
};

type Response = {
  submissionId: string;
  submissionTime: string;
  lastUpdatedAt: string;
  questions: ResponseItem[];
  calculations: ResponseItem[];
  urlParameters: ResponseItem[];
  quiz: Record<string, unknown>;
  documents: ResponseItem[];
};

export type IFormResponses = {
  responses: Response[];
  totalResponses: number;
  pageCount: number;
}

export type IApiResponse = {
  data: IFormResponses;
};
