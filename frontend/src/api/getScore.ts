import { PersonalInfo } from "@/utils/data";
import baseApi from "./services";

export interface getScoreModel {
  ingredients: string;
  personInfo: PersonalInfo["info"];
}
export interface getScoreResultModel {
  safety_score: number;
  caution_message: string;
  short_term_effects: string[];
  long_term_effects: string[];
  environmental_score: number;
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
