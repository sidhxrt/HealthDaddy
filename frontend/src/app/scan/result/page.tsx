"use client";
import { getScoreResultModel } from "@/api/getScore";
import { List, ListItemText, Typography } from "@mui/material";

export default function Result({
  searchParams,
}: {
  searchParams: getScoreResultModel;
}) {
  return (
    <>
      <Typography>Result</Typography>
      <List>
        <ListItemText>Score:{searchParams.score}</ListItemText>
        <ListItemText>Caution:{searchParams.caution}</ListItemText>
      </List>
    </>
  );
}
