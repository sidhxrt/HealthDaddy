import { IconButton } from "@mui/material";

import { ReactElement } from "react";

interface CircleIconButtonProps {
  Icon: ReactElement;
  onClick: () => void;
}

export default function CircleIconButton({
  Icon,
  onClick,
}: CircleIconButtonProps) {
  return (
    <IconButton
      sx={{
        width: "70px",
        height: "70px",
        border: "double 2px grey",
        backgroundColor: "white",
      }}
      onClick={onClick}
    >
      {Icon}
    </IconButton>
  );
}
