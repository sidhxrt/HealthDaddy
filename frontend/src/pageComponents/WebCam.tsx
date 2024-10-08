"use client";
import CircleIconButton from "@/app/components/CircleIconButton";
import Download from "@mui/icons-material/Download";
import Cached from "@mui/icons-material/Cached";
import CameraAlt from "@mui/icons-material/CameraAlt";
import Close from "@mui/icons-material/Close";
import Done from "@mui/icons-material/Done";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "react-camera-pro";
import { AspectRatio } from "react-camera-pro/dist/components/Camera/types";
import VisuallyHiddenInput from "@/app/components/VisuallyHiddenInput";

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
  const mobileScreen = useMediaQuery("(min-width: 600px)");
  const [ratio, setRatio] = useState<AspectRatio>();

  useEffect(() => {
    //set ratio camera
    if (mobileScreen) {
      setRatio(4 / 3);
    } else {
      // setRatio("cover");
      setRatio(9 / 18);
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
            <Box
              sx={{
                position: "absolute",
                zIndex: 3,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-65%)",
                minWidth: "70%",
                minHeight: "60%",
                borderRadius: "5px",
                background: ` conic-gradient(from 90deg  at top    5px left  5px,#0000 90deg,white 0) 0    0    / 40px 40px border-box no-repeat,
                              conic-gradient(from 180deg at top    5px right 5px,#0000 90deg,white 0) 100% 0    / 40px 40px border-box no-repeat,
                              conic-gradient(from 0deg   at bottom 5px left  5px,#0000 90deg,white 0) 0    100% / 40px 40px border-box no-repeat,
                              conic-gradient(from -90deg at bottom 5px right 5px,#0000 90deg,white 0) 100% 100% / 40px 40px border-box no-repeat`,
              }}
            />
            <Camera
              ref={camera}
              aspectRatio={ratio}
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
              tabIndex={-1}
              component="label"
              role={undefined}
              Icon={
                <>
                  <Download fontSize={"large"} />
                  <VisuallyHiddenInput
                    type="image"
                    onChange={(event) => console.log(event.target.files)}
                  />
                </>
              }
              onClick={capture}
            />
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
