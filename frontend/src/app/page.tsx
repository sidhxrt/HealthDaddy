import useInfoDb, { PersonalInfo } from "@/utils/data";
import { Stack, TextField, Typography } from "@mui/material";

export default function Home() {
  const db = useInfoDb();
  const saveInfo = async (data: PersonalInfo) => {
    db.storeInfo(data);
  };
  return (
    <Stack sx={{ alignItems: "center" }}>
      <Typography variant="h3">Enter Your details</Typography>
      <TextField label="Outlined" variant="outlined" />
    </Stack>
  );
}
