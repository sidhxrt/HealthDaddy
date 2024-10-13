import { Camera, CameraType } from "react-camera-pro";
import CameraAlignmentBox from "./CameraAlignmentBox";
import { AspectRatio } from "react-camera-pro/dist/components/Camera/types";
import { SetStateAction } from "react";

interface CameraModuleProps {
  camera: React.RefObject<CameraType>;
  ratio: AspectRatio;
  setNumberOfCameras: React.Dispatch<SetStateAction<number>>;
}

export default function CameraModule({
  camera,
  ratio,
  setNumberOfCameras,
}: CameraModuleProps) {
  return (
    <>
      <CameraAlignmentBox />
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
    </>
  );
}
