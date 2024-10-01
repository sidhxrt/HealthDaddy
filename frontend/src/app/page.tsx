import { Stack, TextField, Typography } from "@mui/material";

export default function Home() {
  return (
    <Stack sx={{ alignItems: "center" }}>
      <Typography variant="h3">Enter Your details</Typography>
      <TextField label="Outlined" variant="outlined" />
    </Stack>
  );
}
