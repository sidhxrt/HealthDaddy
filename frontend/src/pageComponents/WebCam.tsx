"use client";
import { Button, Stack, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { SetStateAction, useCallback, useRef, useState } from "react";
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
  const webcamRef = useRef<Webcam>(null);
  const mobileScreen = useMediaQuery("(min-width: 600px)");
  const ratio = mobileScreen ? 4 / 3 : 16 / 9;

  const videoConstraints = {
    aspectRatio: ratio,
    facingMode: { exact: "user" },
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImage(imageSrc);
      }
    }
  }, [webcamRef]);

  return (
    <Stack alignItems={"center"} overflow={"hidden"}>
      {image ? (
        <>
          <Image src={image} alt="Screenshot" />
          <Button
            onClick={() => {
              setImage(null);
            }}
          >
            delete
          </Button>
          <Button onClick={getScoreAndRedirect}>Submit</Button>
        </>
      ) : (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            imageSmoothing={false}
            screenshotQuality={1}
            videoConstraints={videoConstraints}
          />
          <Button onClick={capture}>Capture photo</Button>
        </>
      )}
    </Stack>
  );
}
