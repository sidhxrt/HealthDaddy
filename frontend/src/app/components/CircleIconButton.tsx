import { IconButton, IconButtonProps } from "@mui/material";

import { ReactElement } from "react";

interface CircleIconButtonProps extends IconButtonProps {
  Icon: ReactElement;
}

export default function CircleIconButton({
  Icon,
  children,
  ...other
}: CircleIconButtonProps) {
  return (
    <IconButton
      {...other}
      sx={{
        width: "70px",
        height: "70px",
        borderRadius: "20px",
        border: "double 2px black",
        backgroundColor: "white",
      }}
    >
      {Icon}
      {children}
    </IconButton>
  );
}
