"use client";

import getScore from "@/api/getScore";
import WebCam from "@/pageComponents/WebCam";
import useInfoDb from "@/utils/data";
import getTextFromImg from "@/utils/ocr";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Scan() {
  const db = useInfoDb();
  const router = useRouter();
  const [image, setImage] = useState<string  | null>(null);
  const getScoreAndRedirect = async () => {
    if (image) {
      const ocrText = await getTextFromImg(image);
      const personalInfo = await db.fetchInfo();
      if (!personalInfo) {
        router.push("/");
      }
      console.log(personalInfo);

      // getScore({ ingredients: ocrText, personInfo: personalInfo.info }).then(
      // (data) => {
      const data = {
        score: 48,
        caution:
          "careful, you have allergies to milk and this may contain trace amounts of milk solids",
      };
      const queryParams = new URLSearchParams(data as any).toString();
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
