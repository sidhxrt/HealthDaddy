import { IconButton } from "@mui/material";

import { ReactElement } from "react";

interface CircleIconButtonProps {
  Icon: ReactElement;
  onClick: () => void;
  disabled?: boolean;
}

export default function CircleIconButton({
  Icon,
  onClick,
  disabled,
}: CircleIconButtonProps) {
  return (
    <IconButton
      disabled={disabled}
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
