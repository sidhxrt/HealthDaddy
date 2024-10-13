"use client";
import { amber, green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: { main: amber["300"] },
    background: {
      default: green["100"],
    },
  },
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
