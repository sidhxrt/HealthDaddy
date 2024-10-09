import { IconButton, IconButtonProps } from "@mui/material";

import { ReactElement } from "react";

interface CircleIconButtonProps extends IconButtonProps {
  Icon: ReactElement;
}

export default function CircleIconButton({
  Icon,
  onClick,
  disabled,
  sx,
  children,
  ...other
}: CircleIconButtonProps) {
  return (
    <IconButton
      {...other}
      sx={{
        width: "70px",
        height: "70px",
        border: "double 2px grey",
        backgroundColor: "white",
      }}
    >
      {Icon}
      {children}
    </IconButton>
  );
}
