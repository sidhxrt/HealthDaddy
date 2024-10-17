import React from "react";

import { Cached, Lens, UploadRounded } from "@mui/icons-material";

import VisuallyHiddenInput from "@/app/components/VisuallyHiddenInput";
import CircleIconButton from "@/app/components/CircleIconButton";

interface CaptureButtonsProps {
  capture: () => void;
  changeCam: () => void;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CaptureButtons: React.FC<CaptureButtonsProps> = ({
  capture,
  changeCam,
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
        color="primary"
        tabIndex={-1}
        Icon={<UploadRounded fontSize="large" />}
      >
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={saveImage}
        />
      </CircleIconButton>

      <CircleIconButton
        color="primary"
        Icon={<Lens fontSize="large" />}
        onClick={capture}
      />

      <CircleIconButton
        disabled={true}
        color="primary"
        Icon={<Cached fontSize="large" />}
        onClick={changeCam}
      />
    </>
  );
};
