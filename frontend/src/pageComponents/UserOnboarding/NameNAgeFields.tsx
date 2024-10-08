import { PersonalInfo } from "@/utils/data";
import { ArrowRightAlt } from "@mui/icons-material";
import {
  FormHelperText,
  TextField,
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";

interface NameNAgeFieldsProps {
  setScreen: (screen: string) => void;
  values: PersonalInfo;
  setValues: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  formSubmitted: boolean;
}
export default function NameNAgeFields({
  setScreen,
  values,
  setValues,
  formSubmitted,
}: NameNAgeFieldsProps) {
  return (
    <>
      <Typography variant="h4" align="center">
        Enter Your details
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={values.name}
        onChange={(e: { target: { name: string; value: string } }) => {
          setValues({ ...values, [e.target.name]: e.target.value });
        }}
        fullWidth
        sx={{ height: "56px", marginButton: "10px" }}
        error={formSubmitted && !values.name?.trim()}
      />
      {formSubmitted && !values.name?.trim() && (
        <FormHelperText error>This field is required.</FormHelperText>
      )}
      <TextField
        label="Age"
        variant="outlined"
        name="age"
        value={values.info.age !== 0 ? values.info.age : ""}
        onChange={(e: { target: { name: string; value: string } }) => {
          setValues({
            ...values,
            info: {
              ...values.info,
              [e.target.name]: Number(e.target.value),
            } as PersonalInfo["info"],
          });
        }}
        fullWidth
        sx={{ height: "56px", marginBottom: "10px" }}
        error={formSubmitted && !values.info?.age}
      />
      {formSubmitted && !values.info?.age && (
        <FormHelperText error>This field is required.</FormHelperText>
      )}
      {values.name !== "" && values.info.age !== 0 && (
        <Button
          onClick={() => {
            setScreen("health conditions");
          }}
        >
          <ArrowRightAlt />
        </Button>
      )}
    </>
  );
}
