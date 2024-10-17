import Webcam from "react-webcam";
import CameraAlignmentBox from "./CameraAlignmentBox";
import { SetStateAction, useRef } from "react";
import { Stack } from "@mui/material";
import { CaptureButtons } from "./CameraButtons";

interface CameraModuleProps {
  setImage: React.Dispatch<SetStateAction<string | null>>;
}

export default function CameraModule({ setImage }: CameraModuleProps) {
  const camera = useRef<Webcam>(null);
  const videoConstraints = {
    height: 4096,
    width: 2160,
    facingMode: "environment",
  };

  const capture = () => {
    if (camera.current) {
      const photo = camera.current?.getScreenshot() as string;
      setImage(photo);
    }
  };

  const changeCam = () => {
    if (camera.current) {
    }
  };

  return (
    <>
      <CameraAlignmentBox />
      <Webcam
        style={{ width: "100%", height: "80%" }}
        ref={camera}
        imageSmoothing={false}
        screenshotQuality={1}
        videoConstraints={videoConstraints}
      ></Webcam>
      <Stack
        sx={{
          width: "100%",
          height: "20%",
          marginTop: "auto",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <CaptureButtons
          capture={capture}
          changeCam={changeCam}
          setImage={setImage}
        />
      </Stack>
    </>
  );
}
