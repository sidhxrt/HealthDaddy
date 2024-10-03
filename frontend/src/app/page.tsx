"use client";
import React, { Fragment, useEffect, useState } from "react";
import useInfoDb, { PersonalInfo } from "@/utils/data";
import {
  Stack,
  TextField,
  Typography,
  Container,
  Button,
  FormHelperText,
} from "@mui/material";

import { useRouter } from "next/navigation";

export default function Home() {
  const questions = [
    ["allergies", "Do you have any known allergies?"],
    ["current_meds", "Are you currently taking any medications?"],
    ["med_condition", "Do you have a medical condition?"],
    ["pregnancy_bf", "Are you pregnant or breastfeeding?"],
    ["lifestyle_factors", "Do you consume Alcohol or Tobacco?"],
    ["diet_restrictions", "Are you following any dietary restrictions?"],
  ];
  const db = useInfoDb();
  const router = useRouter();

  useEffect(() => {
    db.fetchInfo().then((res) => {
      if (res) router.push("/scan");
    });
  }, [db]);

  const [values, setValues] = useState<PersonalInfo>({
    name: "",
    info: {
      age: 0,
      allergies: "",
      current_meds: "",
      med_condition: "",
      pregnancy_bf: "",
      lifestyle_factors: "",
      diet_restrictions: "",
    },
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.name?.trim()) {
      console.log(values.name);

      newErrors["name"] = "This field is required.";
    }
    if (!values.info?.age) {
      newErrors["age"] = "This field is required.";
    }
    questions.forEach((question) => {
      if (!values.info?.[question[0] as keyof PersonalInfo["info"]]) {
        newErrors[question[0]] = "This field is required.";
      }
    });
    if (!Object.keys(newErrors).length) {
      db.storeInfo(values);
      router.push("/scan");
    }
    setFormSubmitted(true);
  };

  return (
    <Container maxWidth="sm">
      <Stack
        sx={{
          gap: "10px",
          width: "400px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: "100vh",
        }}
      >
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

        {questions.map((question, index) => (
          <Fragment key={index}>
            <TextField
              label={question[1]}
              variant="outlined"
              name={question[0]}
              value={
                values.info
                  ? values.info[question[0] as keyof PersonalInfo["info"]] || ""
                  : ""
              }
              onChange={(e: { target: { name: string; value: string } }) => {
                setValues({
                  ...values,
                  info: {
                    ...values.info,
                    [e.target.name]: e.target.value,
                  } as PersonalInfo["info"],
                });
              }}
              fullWidth
              sx={{ height: "56px", marginBottom: "10px" }}
              error={
                formSubmitted &&
                !values.info?.[question[0] as keyof PersonalInfo["info"]]
              }
            />
            {formSubmitted &&
              !values.info?.[question[0] as keyof PersonalInfo["info"]] && (
                <FormHelperText error>This field is required.</FormHelperText>
              )}
          </Fragment>
        ))}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "100%" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
    </Container>
  );
}
