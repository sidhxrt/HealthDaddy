import { Box, Typography, useTheme } from "@mui/material";

export default function CameraAlignmentBox() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 3,
        top: "53%",
        left: "50%",
        transform: "translate(-50%,-70%)",
        minWidth: "85%",
        height: "65%",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background: ` conic-gradient(from 90deg  at top    5px left  5px,#0000 90deg,${theme.palette.secondary.light} 0) 0    0    / 40px 40px border-box no-repeat,
      conic-gradient(from 180deg at top    5px right 5px,#0000 90deg,${theme.palette.secondary.light} 0) 100% 0    / 40px 40px border-box no-repeat,
      conic-gradient(from 0deg   at bottom 5px left  5px,#0000 90deg,${theme.palette.secondary.light} 0) 0    100% / 40px 40px border-box no-repeat,
      conic-gradient(from -90deg at bottom 5px right 5px,#0000 90deg,${theme.palette.secondary.light} 0) 100% 100% / 40px 40px border-box no-repeat`,
        }}
      >
        <Typography variant="h5" color="secondary">
          Scan the Ingredients
        </Typography>
      </Box>
    </Box>
  );
}
