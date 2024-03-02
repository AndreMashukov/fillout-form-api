import axios from "axios";
import { IApiResponse, IFormResponses } from "../types/IApiResponse";

const getHeaders = () => {
  const token =
    "sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912";
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};


interface IParams {
  formId: string;
  limit: number;
  offset: number;
}

const getFilloutData = async ({
  formId,
  limit,
  offset,
}: IParams): Promise<IFormResponses> => {

  const URL = `https://api.fillout.com/v1/api/forms/${formId}/submissions`;
  try {
    const result: IApiResponse = await axios.get(URL, { 
      headers: getHeaders(),
      params: {
        limit,
        offset,
      },
    });

    return result.data;
  } catch (error) {
    throw new Error("Failed to fetch form responses");
  }
};

export default {
  getFilloutData,
};
