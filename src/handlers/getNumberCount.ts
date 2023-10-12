import { Request, Response } from "express";
import { arrayNumberCount } from "@utils/arrayNumberCount";
import { NumberStore } from "@types";

export const getNumberCount = (
  request: Request,
  response: Response,
  numberStore: NumberStore,
) => {
  const number = Number(request.query["number"]);

  response.send(arrayNumberCount(numberStore, number).toString());
};
