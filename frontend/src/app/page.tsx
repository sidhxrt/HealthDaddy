"use client";
import React, { Fragment, useEffect, useState } from "react";
import NameNAgeFields from "@/pageComponents/UserOnboarding/NameNAgeFields";

import useInfoDb, { PersonalInfo } from "@/utils/data";
import { Stack, TextField, Button, FormHelperText } from "@mui/material";

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

  const [screen, setScreen] = useState("start");
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
    <Stack height={"100vh"} justifyContent={"center"} overflow={"auto"}>
      <Stack
        sx={{
          px: { xs: "20px", sm: "30%" },
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {screen === "start" && (
          <NameNAgeFields
            setScreen={setScreen}
            values={values}
            setValues={setValues}
            formSubmitted={formSubmitted}
          />
        )}
        {screen === "health conditions" &&
          questions.map((question, index) => (
            <Fragment key={index}>
              <TextField
                label={question[1]}
                variant="outlined"
                name={question[0]}
                value={
                  values.info
                    ? values.info[question[0] as keyof PersonalInfo["info"]] ||
                      ""
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
        {screen === "health conditions" && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "100%" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
