import { TextField, Typography } from "@mui/material";

export default function NameNAgeFields() {
    return (
        <>
            <Typography variant="h3" align="center">
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
            {values.name!=="" && values.info.age!==0 && <Button onClick={()=>{setScreen("health conditions")}}>-></Button>}
          </>
    )
}