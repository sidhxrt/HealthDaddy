"use client";

import getScore from "@/api/getScore";
import WebCam from "@/pageComponents/Scan/WebCam";
import useInfoDb from "@/utils/data";
import getTextFromImg from "@/utils/ocr";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Scan() {
  const db = useInfoDb();
  const router = useRouter();

  const [processing, setProcessing] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const getScoreAndRedirect = async () => {
    setProcessing(true);
    if (image) {
      try {
        const ocrText = await getTextFromImg(image);
        const personalInfo = await db.fetchInfo();
        if (!personalInfo) {
          router.push("/");
        }
        console.log(personalInfo);
        const responseData = await getScore({
          ingredients: ocrText,
          personInfo: personalInfo.info,
        });

        const queryParams = new URLSearchParams(
          Object.entries(responseData).reduce((acc, [key, value]) => {
            acc[key] = Array.isArray(value) ? value.join(",") : String(value);
            return acc;
          }, {} as Record<string, string>)
        ).toString();
        
        router.push(`/scan/result?${queryParams}`);
      } catch (error) {
        setProcessing(false);
        console.error(error);
      }
    }
  };

  return (
    <WebCam
      image={image}
      setImage={setImage}
      getScoreAndRedirect={getScoreAndRedirect}
      processing={processing}
      setProcessing={setProcessing}
    />
  );
}
