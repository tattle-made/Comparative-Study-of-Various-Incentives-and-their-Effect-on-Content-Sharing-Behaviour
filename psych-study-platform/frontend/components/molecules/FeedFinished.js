import { Section } from "../atoms/Section";
import { config } from "~/api/study-phase/request";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "~/api/hook";
import { Box, Heading, Text, Button } from "grommet";

export function FeedFinished() {
  return (
    <Section>
      {" "}
      <h1>Study Finished</h1>{" "}
    </Section>
  );
}
