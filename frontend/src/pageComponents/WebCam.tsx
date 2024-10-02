"use client";
import CircleIconButton from "@/app/components/CircleIconButton";
import Cached from "@mui/icons-material/Cached";
import CameraAlt from "@mui/icons-material/CameraAlt";
import Close from "@mui/icons-material/Close";
import Done from "@mui/icons-material/Done";
import { Stack } from "@mui/material";
import { SetStateAction, useRef, useState } from "react";
import { Camera, CameraType } from "react-camera-pro";

interface WebCamProps {
  image: string | null;
  setImage: React.Dispatch<SetStateAction<string | null>>;
  getScoreAndRedirect: () => void;
}

export default function WebCam({
  image,
  setImage,
  getScoreAndRedirect,
}: WebCamProps) {
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const camera = useRef<CameraType>(null);

  const capture = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto() as string;
      console.log(photo);
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
      justifyContent={"end"}
      overflow={"hidden"}
    >
      {image ? (
        <>
          <Stack
            width={"100%"}
            height={"100%"}
            sx={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              justifyContent: "end",
            }}
          >
            {/* <img src={image} alt="Screenshot" /> */}
            <Stack
              sx={{
                width: "100%",
                height: "20%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <CircleIconButton
                Icon={<Done fontSize={"large"} />}
                onClick={getScoreAndRedirect}
              />
              <CircleIconButton
                Icon={<Close fontSize={"large"} />}
                onClick={() => {
                  setImage(null);
                }}
              />
            </Stack>
          </Stack>
        </>
      ) : (
        <>
          <Stack width={"100%"} height={"100%"} overflow={"hidden"}>
            <Camera
              ref={camera}
              aspectRatio="cover"
              numberOfCamerasCallback={setNumberOfCameras}
              errorMessages={{
                noCameraAccessible:
                  "No camera device accessible. Please connect your camera or try a different browser.",
                permissionDenied:
                  "Permission denied. Please refresh and give camera permission.",
                switchCamera:
                  "It is not possible to switch camera to different one because there is only one video device accessible.",
                canvas: "Canvas is not supported.",
              }}
            />
          </Stack>

          <Stack
            sx={{
              width: "100%",
              height: "20%",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <CircleIconButton
              Icon={<CameraAlt fontSize={"large"} />}
              onClick={capture}
            />
            <CircleIconButton
              disabled={numberOfCameras <= 1}
              Icon={<Cached fontSize="large" />}
              onClick={changeCam}
            />
          </Stack>
        </>
      )}
    </Stack>
  );
}
