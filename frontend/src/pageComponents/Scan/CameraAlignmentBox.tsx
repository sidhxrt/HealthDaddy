import { Box } from "@mui/material";

export default function CameraAlignmentBox() {
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 3,
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-65%)",
        minWidth: "70%",
        minHeight: "60%",
        borderRadius: "5px",
        background: ` conic-gradient(from 90deg  at top    5px left  5px,#0000 90deg,white 0) 0    0    / 40px 40px border-box no-repeat,
                              conic-gradient(from 180deg at top    5px right 5px,#0000 90deg,white 0) 100% 0    / 40px 40px border-box no-repeat,
                              conic-gradient(from 0deg   at bottom 5px left  5px,#0000 90deg,white 0) 0    100% / 40px 40px border-box no-repeat,
                              conic-gradient(from -90deg at bottom 5px right 5px,#0000 90deg,white 0) 100% 100% / 40px 40px border-box no-repeat`,
      }}
    />
  );
}
