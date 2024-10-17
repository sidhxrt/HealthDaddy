"use client";
import CircleIconButton from "@/app/components/CircleIconButton";
import Close from "@mui/icons-material/Close";
import Done from "@mui/icons-material/Done";
import { Stack, useMediaQuery } from "@mui/material";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { CameraType } from "react-camera-pro";
import { AspectRatio } from "react-camera-pro/dist/components/Camera/types";
import CameraModule from "./CameraModule";
import { CaptureButtons } from "./CameraButtons";
import LinearLoaderAuto from "@/app/components/LinearLoaderAuto";

interface WebCamProps {
  image: string | null;
  setImage: React.Dispatch<SetStateAction<string | null>>;
  getScoreAndRedirect: () => void;
  processing: boolean;
  setProcessing: React.Dispatch<SetStateAction<boolean>>;

}

export default function WebCam({
  image,
  setImage,
  getScoreAndRedirect,
  processing,
  setProcessing
}: WebCamProps) {
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const camera = useRef<CameraType>(null);
  const mobileScreen = useMediaQuery("(max-width: 600px)");
  const [ratio, setRatio] = useState<AspectRatio>(21 / 9);

  useEffect(() => {
    //set ratio camera
    if (mobileScreen) {
      setRatio(9 / 16);
    } else {
      // setRatio("cover");
      setRatio(21 / 9);
    }
  }, [mobileScreen, ratio]);

  const capture = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto() as string;
      // console.log(photo);
      setImage(photo);
    }
  };
  const changeCam = () => {
    if (camera.current) {
      const result = camera.current.switchCamera();
      console.log(result);
    }
  };

  return (
    <Stack
      height={"100vh"}
      maxHeight={"100vh"}
      alignItems={"center"}
      overflow={"hidden"}
    >
      {image ? (
        <img
          style={{ height: "80%", width: "100%" }}
          src={image}
          alt="Screenshot"
        />
      ) : (
        <>
          <CameraModule
            camera={camera}
            ratio={ratio}
            setNumberOfCameras={setNumberOfCameras}
          />
        </>
      )}
      {processing && <LinearLoaderAuto />}
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
        {image ? (
          <>
            <CircleIconButton
              Icon={<Done fontSize={"large"} />}
              disabled={processing}
              onClick={getScoreAndRedirect}
            />
            <CircleIconButton
              Icon={<Close fontSize={"large"} />}
              onClick={() => {
                setProcessing(false);
                setImage(null);
              }}
            />
          </>
        ) : (
          <CaptureButtons
            capture={capture}
            changeCam={changeCam}
            numberOfCameras={numberOfCameras}
            setImage={setImage}
          />
        )}
      </Stack>
    </Stack>
  );
}
