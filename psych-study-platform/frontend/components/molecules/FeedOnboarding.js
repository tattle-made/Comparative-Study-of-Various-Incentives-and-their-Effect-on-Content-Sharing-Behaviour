import { useApi } from "~/api/hook";
import { config } from "~/api/study-phase/request";
import { Box, Heading, Text, Button, Paragraph } from "grommet";
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
      <Heading>User Onboarding</Heading>
      <Paragraph fill>
        Welcome to the study on content sharing on social media by Tattle and
        Monk Prayogshala!
      </Paragraph>
      <Paragraph fill>
        As mentioned earlier, in this section you will be presented with a few
        posts every day for three days. You can choose to react and/or share
        these messages as you usually do on social media. You can also choose to
        read more about each post.
      </Paragraph>
      <Paragraph fill>
        Note that you will be provided with some false and some true messages.
        You would need to discern which is which and share accordingly.
      </Paragraph>
      <Text weight={600}>
        Note that once you react/share, you will not be able to undo it.
      </Text>
      <Text weight={600}>You can scroll down for the next post!</Text>

      <Paragraph fill>
        You will need to login for three days to see all the posts, complete the
        study, and receive payments. You will also receive reminder emails to
        log in! You can log in after 24 hours; for example, if you log in at 10
        AM on day 1, you can log in after 10 AM on day 2.
      </Paragraph>
      <Paragraph fill>
        For more details, you can write to us at ar@monkprayogshala.in or
        hk@monkprayogshala.in
      </Paragraph>
      <Button
        onClick={async () => {
          await trigger();
        }}
        primary
        alignSelf="start"
        label={"Continue to Posts"}
      ></Button>
    </Section>
  );
}
