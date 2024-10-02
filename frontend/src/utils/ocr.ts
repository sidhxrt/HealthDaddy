import Tesseract from "tesseract.js";

export default async function getTextFromImg(image: string) {
  const ocrData = await Tesseract.recognize(image, "eng", {
    // logger: (m) => console.log(m),
  });
  console.log(ocrData);
  return ocrData.data.text;
}
