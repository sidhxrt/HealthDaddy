import { PersonalInfo } from "@/utils/data";
import baseApi from "./services";

export interface getScoreModel {
  ingredients: string;
  personInfo: PersonalInfo["info"];
}
export interface getScoreResultModel {
  score: number;
  caution: string;
}

export default async function getScore(data: getScoreModel) {
  try {
    const response = await baseApi.post("/getScore/", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
