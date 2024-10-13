import React from "react";

import Cached from "@mui/icons-material/Cached";
import CameraAlt from "@mui/icons-material/CameraAlt";
import Upload from "@mui/icons-material/Upload";

import VisuallyHiddenInput from "@/app/components/VisuallyHiddenInput";
import CircleIconButton from "@/app/components/CircleIconButton";
import { Stack } from "@mui/material";

interface CaptureButtonsProps {
  capture: () => void;
  changeCam: () => void;
  numberOfCameras: number;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CaptureButtons: React.FC<CaptureButtonsProps> = ({
  capture,
  changeCam,
  numberOfCameras,
  setImage,
}) => {
  const saveImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <CircleIconButton
        component="label"
        role={undefined}
        tabIndex={-1}
        Icon={<Upload fontSize="large" />}
      >
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={saveImage}
        />
      </CircleIconButton>

      <CircleIconButton
        Icon={<CameraAlt fontSize="large" />}
        onClick={capture}
      />

      <CircleIconButton
        disabled={numberOfCameras <= 1}
        Icon={<Cached fontSize="large" />}
        onClick={changeCam}
      />
    </>
  );
};
