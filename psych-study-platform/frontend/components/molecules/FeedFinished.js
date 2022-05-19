import { Section } from "../atoms/Section";
import { config } from "~/api/study-phase/request";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "~/api/hook";
import { Box, Heading, Text, Button, Paragraph, Anchor } from "grommet";
import { useRecoilState } from "recoil";
import { UserMetric } from "~/UserState";

export function FeedFinished() {
  const [userMetric, setUserMetric] = useRecoilState(UserMetric);
  return (
    <Section>
      <Heading>Thank You</Heading>
      <Paragraph>
        Tattle and Monk Prayogshala thank you for your participation! You will
        receive your compensation in the next couple of weeks :)
      </Paragraph>
      <Box height={"2em"}></Box>
      <Box>
        <Text>
          We'd also like to ask you a few more questions. This will take about
          5-7 minutes. Please click the link here to answer those questions.
        </Text>
        {userMetric.type === "VANITY" ? (
          <Box>
            <Anchor
              href="https://uconn.co1.qualtrics.com/jfe/form/SV_ehpVV8ivYGED02y"
              label={"Take the Survey"}
              target={"_blank"}
            ></Anchor>
          </Box>
        ) : null}
        {userMetric.type === "MONETARY" ? (
          <Box>
            <Anchor
              href="https://uconn.co1.qualtrics.com/jfe/form/SV_1B2T5R1arg5Q4nk"
              label={"Take the Survey"}
              target={"_blank"}
            ></Anchor>
          </Box>
        ) : null}
      </Box>
    </Section>
  );
}
