import FileResizer from "react-image-file-resizer";

export default async function scaleImage(
  image: string,
  scale: number,
  rotation?: number
) {
  const blob = b64toBlob(image);
  const dimensions = await getPngDimensions(image);
  const aspectRatio = dimensions.width / dimensions.height;

  return new Promise<string>((resolve) => {
    FileResizer.imageFileResizer(
      blob,
      aspectRatio * scale,
      aspectRatio * scale,
      "PNG",
      100,
      rotation ?? 0,
      (uri) => {
        resolve(uri as string);
      },
      "base64"
    );
  });
}

function b64toBlob(dataURI: string) {
  const byteString = atob(dataURI.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/jpeg" });
}
const getPngDimensions = (image: string) => {
  return new Promise<{
    height: number;
    width: number;
  }>((resolve, reject) => {
    try {
      const img = document.createElement("img");
      img.addEventListener("load", () => {
        resolve({ width: img.width, height: img.height });
      });
      img.src = image;
    } catch (error) {
      reject(error);
    }
  });
};
