"use client";

import WebCam from "@/pageComponents/WebCam";
import useInfoDb from "@/utils/data";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Scan() {
  const db = useInfoDb();
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const getScoreAndRedirect = async () => {
    if (image) {
      // const ocrText = await getTextFromImg(image);
      const personalInfo = await db.fetchInfo();
      if (!personalInfo) {
        router.push("/");
      }
      console.log(personalInfo);

      // getScore({ ingredients: ocrText, personInfo: personalInfo.info }).then(
      // (data) => {
      const data = {
        safety_score: 78,
        caution_message:
          "careful, you have allergies to milk and this may contain trace amounts of milk solids",
        short_term_effects: ["Makes you fat"],
        long_term_effects: ["gives your heart disease"],
        environmental_score: 30,
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
