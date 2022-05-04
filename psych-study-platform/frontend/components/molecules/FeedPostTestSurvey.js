import { Section } from "../atoms/Section";
import { config } from "~/api/study-phase/request";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "~/api/hook";
import { Box, Heading, Text, Button } from "grommet";

export function FeedPostTestSurvey() {
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
      {" "}
      <h1>Feed Post Test Survey</h1>{" "}
      <Button
        onClick={async () => {
          await trigger();
        }}
        label={"Next"}
      ></Button>
    </Section>
  );
}
