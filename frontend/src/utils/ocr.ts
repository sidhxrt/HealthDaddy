import { createWorker } from "tesseract.js";
import { toRadians } from "./utils";
import scaleImage from "./scaleImage";

export default async function getTextFromImg(image: string) {
  const worker = await createWorker("eng", undefined, {
    legacyCore: true,
    legacyLang: true,
  });
  worker.setParameters({ user_defined_dpi: "300" });
  const resizedImage = await scaleImage(image);

  const { data } = await worker.detect(resizedImage);

  const ocrData = await worker.recognize(
    resizedImage,
    {
      rotateRadians: toRadians(data.orientation_degrees) ?? 0,
    },
    { text: true }
  );
  console.log(ocrData);
  worker.terminate();
  return ocrData.data.text;
}
