"use client";
import CircleIconButton from "@/app/components/CircleIconButton";
import Close from "@mui/icons-material/Close";
import Done from "@mui/icons-material/Done";
import { Stack } from "@mui/material";
import { SetStateAction } from "react";
import CameraModule from "./CameraModule";
import LinearLoaderAuto from "@/app/components/LinearLoaderAuto";
import Webcam from "react-webcam";

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
  setProcessing,
}: WebCamProps) {
  return (
    <Stack
      height={"100vh"}
      maxHeight={"100vh"}
      alignItems={"center"}
      overflow={"hidden"}
    >
      {image ? (
        <>
          <img style={{ height: "80%" }} src={image} alt="Screenshot" />
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
          </Stack>
        </>
      ) : (
        <>
          <CameraModule setImage={setImage} />
        </>
      )}
      {processing && <LinearLoaderAuto />}
    </Stack>
  );
}
