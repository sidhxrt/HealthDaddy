"use client";
import CameraAlt from "@mui/icons-material/CameraAlt";
import Close from "@mui/icons-material/Close";
import Done from "@mui/icons-material/Done";
import { Button, IconButton, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";

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
  const theme = useTheme();
  const webcamRef = useRef<Webcam>(null);

  const [videoConstraints, setVideoConstraints] = useState({
    aspectRatio: 1.98,
  });

  useEffect(() => {
    setVideoConstraints({
      aspectRatio: window.innerWidth / (window.innerHeight * 0.9),
    });
  });

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImage(imageSrc);
      }
    }
  }, [webcamRef]);

  return (
    <Stack height={"98vh"} alignItems={"center"} justifyContent={"end"}>
      {image ? (
        <>
          <Stack width={"100%"}>
            <img src={image} alt="Screenshot" />
          </Stack>

          <Stack
            sx={{
              width: "100%",
              flexDirection: "row",
              gap: "10px",
              flexGrow: "1",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              sx={{
                width: "70px",
                height: "70px",
                border: "double 2px grey",
                backgroundColor: "grey",
              }}
              onClick={getScoreAndRedirect}
            >
              <Done fontSize={"large"} />
            </IconButton>
            <IconButton
              sx={{
                width: "70px",
                height: "70px",
                border: "double 2px grey",
                backgroundColor: "grey",
              }}
              onClick={() => {
                setImage(null);
              }}
            >
              <Close fontSize={"large"} />
            </IconButton>
          </Stack>
        </>
      ) : (
        <>
          <Stack width={"100%"}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              imageSmoothing={false}
              screenshotQuality={1}
              videoConstraints={videoConstraints}
            />
          </Stack>

          <Stack
            sx={{
              width: "100%",
              height: "15vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              sx={{
                width: "70px",
                height: "70px",
                border: "double 2px grey",
                backgroundColor: "grey",
              }}
              onClick={capture}
            >
              <CameraAlt fontSize={"large"} />
            </IconButton>
          </Stack>
        </>
      )}
    </Stack>
  );
}
