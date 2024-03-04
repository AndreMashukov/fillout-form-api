import { Router, Request, Response } from "express";
import services from "../services/filloutApi";
import { IFilterClause } from "../types/IFilterClause";
import { IFormResponses } from "../types/IApiResponse";
import { filterResponse } from "../utils/filterResponse";

const router = Router();

const parseFilterParam = (filterParams: string) => {
  try {
    const parsed: string = JSON.parse(filterParams);
    return JSON.parse(parsed) as IFilterClause[];
  } catch (error) {
    console.error(error);
    return null
  }
};

router.get(
  "/:formId/filteredResponses",
  async (req: Request, res: Response) => {
    const { formId } = req.params;
    const { filters, limit, offset } = req.query;
    try {
      const filtersArray: IFilterClause[] | null = parseFilterParam(filters as string);
      const data: IFormResponses = await services.getFilloutData({
        formId,
        limit: parseInt((limit as string) || "150"),
        offset: parseInt((offset as string) || "0"),
      });
      if (!filtersArray) {
        return res.json(data);
      }
      const filteredResponse = filterResponse({ data, filters: filtersArray });
      return res.json(filteredResponse);
      
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Failed to fetch form responses" });
    }
  }
);

export default router;
