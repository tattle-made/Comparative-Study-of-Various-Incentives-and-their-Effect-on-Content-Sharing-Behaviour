import { useApi } from "~/api/hook";
import { config } from "~/api/study-phase/request";
import { Box, Heading, Text, Button } from "grommet";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "../atoms/Section";

export function FeedOnboarding() {
  const { data, trigger } = useApi(config.checkAndUpdate);
  let navigate = useNavigate();

  useEffect(() => {
    if (data && data.msg === "done") {
      console.log({ HERE: data });
      navigate(0);
    }
  }, [data]);

  return (
    <Section>
      <Heading>Onboarding Section</Heading>
      <Button
        onClick={async () => {
          await trigger();
        }}
        label={"Next"}
      ></Button>
    </Section>
  );
}
