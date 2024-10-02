"use client";
import React, { useState } from "react";
import useInfoDb, { PersonalInfo } from "@/utils/data";
import {
  Stack,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Button,
  FormHelperText,
} from "@mui/material";

import FormLabel from "@mui/material/FormLabel";

export default function Home() {
  const questions = [
    "Do you have any known allergies?",
    "Are you currently taking any medications?",
    "Do you have a medical condition?",
    "Are you pregnant or breastfeeding?",
    "Do you smoke?",
    "Do you consume Alcohol?",
  ];
  const db = useInfoDb();
  const saveInfo = async (data: PersonalInfo) => {
    db.storeInfo(data);
  };
  const [values, setValues] = useState<{
    Name: string;
    Age: string;
    questions: string[];
    errors: { [key: string]: string };
  }>({
    Name: " ",
    Age: " ",
    questions: [],
    errors: {},
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleChanges = (e: { target: { name: any; value: any } }) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.Name.trim()) {
      newErrors["Name"] = "This field is required.";
    }
    if (!values.Age.trim()) {
      newErrors["Age"] = "This field is required.";
    }

    questions.forEach((_, idx) => {
      if (!values.questions[idx]) {
        newErrors[idx] = "This field is required.";
      }
    });
    setValues({ ...values, errors: newErrors });
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
          name="Name"
          value={values.Name}
          onChange={handleChanges}
          fullWidth
          sx={{ height: "56px", marginButton: "10px" }}
          error={formSubmitted && !values.Name.trim()}
        />
        {formSubmitted && !values.Name.trim() && (
          <FormHelperText error>This field is required.</FormHelperText>
        )}

        <TextField
          label="Age"
          variant="outlined"
          name="Age"
          value={values.Age}
          onChange={handleChanges}
          fullWidth
          sx={{ height: "56px", marginBottom: "10px" }}
          error={formSubmitted && !values.Age.trim()}
        />
        {formSubmitted && !values.Age.trim() && (
          <FormHelperText error>This field is required.</FormHelperText>
        )}

        {questions.map((question, index) => (
          <FormControl
            variant="standard"
            key={index}
            fullWidth
            sx={{ width: "100%" }}
          >
            <InputLabel id={`dropdown-label-${index}`}>{question}</InputLabel>
            <Select
              labelId={`dropdown-label-${index}`}
              name={`dropdown-label-${index}`}
              value={values.questions[index] || ""}
              label="Select Option"
              sx={{ height: "56px" }}
              onChange={(e) => {
                const newQuestions = [...values.questions];

                newQuestions[index] = e.target.value;
                setValues({ ...values, questions: newQuestions });
              }}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            {values.errors[index] && (
              <FormHelperText style={{ color: "red" }}>
                {values.errors[index]}
              </FormHelperText>
            )}
          </FormControl>
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
