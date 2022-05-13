import { Section } from "../atoms/Section";
import { config } from "~/api/study-phase/request";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "~/api/hook";
import { Box, Heading, Text, Button, Paragraph } from "grommet";

export function FeedFinished() {
  return (
    <Section>
      <Heading>Thank You</Heading>
      <Paragraph>
        Tattle and Monk Prayogshala thank you for your participation! You will
        receive your compensation in the next couple of weeks :){" "}
      </Paragraph>
    </Section>
  );
}
