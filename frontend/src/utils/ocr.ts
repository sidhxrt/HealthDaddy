import { createWorker } from "tesseract.js";
import scaleImage from "./scaleImage";

export default async function getTextFromImg(image: string) {
  const worker = await createWorker("eng", 2, {
    legacyLang: true,
  });
  worker.setParameters({ user_defined_dpi: "300" });

  const { data } = await worker.detect(await scaleImage(image, 1600));
  console.log(data);

  const ocrData = await worker.recognize(
    await scaleImage(image, 3000, data.orientation_degrees ?? 0),
    {},
    { text: true }
  );
  console.log(ocrData);
  worker.terminate();
  return ocrData.data.text;
}
