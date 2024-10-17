import { createWorker } from "tesseract.js";
import { toRadians } from "./utils";

export default async function getTextFromImg(image: string) {
  const worker = await createWorker("eng", 2, {
    legacyCore: true,
    legacyLang: true,
  });
  worker.setParameters({ user_defined_dpi: "300" });
  const { data } = await worker.detect(image);
  console.log(toRadians(data.orientation_degrees));

  const ocrData = await worker.recognize(
    image,
    {
      rotateRadians: toRadians(data.orientation_degrees) ?? 0,
    },
    { text: true }
  );
  console.log(ocrData);
  worker.terminate();
  return ocrData.data.text;
}
