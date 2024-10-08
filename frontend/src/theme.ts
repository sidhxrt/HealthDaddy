"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-quicksand)",
  },
  components: {
    MuiInputBase: {
      defaultProps: {
        sx: {
          borderRadius: "2px",
        },
      },
    },
  },
});

export default theme;
