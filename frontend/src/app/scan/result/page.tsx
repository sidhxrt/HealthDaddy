"use client";
import { getScoreResultModel } from "@/api/getScore";
import ExpandMoreButton from "@/app/components/ExpandMoreButton";
import { ArrowBack, ExpandMore } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Result({
  searchParams,
}: {
  searchParams: getScoreResultModel;
}) {
  const router = useRouter();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <Stack
        justifyContent={"space-between"}
        height={"30vh"}
        p={"10px"}
        bgcolor={"lightgreen"}
        boxShadow={"inset 0px -4px 6px rgba(0, 0, 0, 0.1)"}
      >
        <IconButton
          sx={{ height: "50px", width: "50px" }}
          onClick={() => {
            router.back();
          }}
        >
          <ArrowBack fontSize="large" />
        </IconButton>
        <Typography variant="h4">{searchParams.safety_score}% Safe</Typography>
      </Stack>
      <Stack paddingX={"8%"} paddingTop={"10%"} gap={"2vh"}>
        <Card sx={{ borderRadius: "20px" }}>
          <CardHeader title="Caution" />
          <CardContent>
            <Typography variant="body1">
              {searchParams.caution_message}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ borderRadius: "20px" }}>
          <CardHeader title="More Details" />
          <CardActions>
            <ExpandMoreButton
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMore />
            </ExpandMoreButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h6">Long Term Effects</Typography>
              <Typography variant="body1" marginBottom={"5px"}>
                {searchParams.long_term_effects}
              </Typography>
              <Typography variant="h6">Short Term Effects</Typography>
              <Typography variant="body1" marginBottom={"5px"}>
                {searchParams.short_term_effects}
              </Typography>
              <Typography variant="body2" marginBottom={"5px"}>
                <b>Environmental Score:{searchParams.environmental_score}</b>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Stack>
    </>
  );
}
