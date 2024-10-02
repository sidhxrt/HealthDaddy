"use client";

import WebCam from "@/pageComponents/WebCam";
import useInfoDb from "@/utils/data";
import getTextFromImg from "@/utils/ocr";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Scan() {
  const db = useInfoDb();
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const getScoreAndRedirect = async () => {
    if (image) {
      // const ocrText =
      await getTextFromImg(image);
      const personalInfo = await db.fetchInfo();
      if (!personalInfo) {
        router.push("/");
      }
      console.log(personalInfo);

      // getScore({ ingredients: ocrText, personInfo: personalInfo.info }).then(
      // (data) => {
      const data = {
        safety_score: 70,
        caution_message:
          "Contains soy and wheat; may trigger allergies. Alcohol consumption can exacerbate potential health risks.",
        short_term_effects: [
          "Risk of allergic reactions, such as hives or gastrointestinal discomfort",
          "Possible bloating or upset stomach from the ingredients ",
        ],
        long_term_effects: [
          "Regular consumption may contribute to weight gain due to high sugar and unhealthy fats",
          "Ongoing exposure to allergens could worsen sensitivities over time",
        ],
        environmental_score: 60,
      };
      const queryParams = new URLSearchParams(
        Object.entries(data).reduce((acc, [key, value]) => {
          acc[key] = Array.isArray(value) ? value.join(",") : String(value);
          return acc;
        }, {} as Record<string, string>)
      ).toString();
      router.push(`/scan/result?${queryParams}`);
      // }
      // );
    }
  };

  return (
    <WebCam
      image={image}
      setImage={setImage}
      getScoreAndRedirect={getScoreAndRedirect}
    />
  );
}
