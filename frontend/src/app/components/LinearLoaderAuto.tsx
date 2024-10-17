import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";

export default function LinearLoaderAuto() {
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (buffer !== 100) {
        setProgress(progress + 1);
        if (buffer < 100 && progress % 5 === 0) {
          const newBuffer = buffer + 1 + Math.random() * 10;
          setBuffer(newBuffer > 100 ? 100 : newBuffer);
        }
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress
        variant="buffer"
        color="secondary"
        value={progress}
        valueBuffer={buffer}
      />
    </Box>
  );
}
