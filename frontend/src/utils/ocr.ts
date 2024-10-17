import { createWorker } from "tesseract.js";
import { toRadians } from "./utils";

export default async function getTextFromImg(image: string) {
  const worker = await createWorker("eng", 2);
  const {
    data: { orientation_degrees },
  } = await worker.detect(image);

  await worker.setParameters({});

  const ocrData = await worker.recognize(
    image,
    {
      rotateRadians: toRadians(orientation_degrees) ?? 0,
    },
    { text: true, hocr: false, tsv: false }
  );
  console.log(ocrData);
  worker.terminate();
  return ocrData.data.text;
}
