import { useEffect } from "react";
import { Box, Text, Paragraph, Anchor, Heading } from "grommet";
import { Section } from "../components/atoms/Section";
import { useRecoilState } from "recoil";
import { UserMetric } from "~/UserState";
import { config as configMetrics } from "~/api/metrics/request";
import { useApi } from "~/api/hook";

function AboutMonetary() {
  return (
    <Box>
      <Text weight={500}>What do I have to do?</Text>
      <Paragraph fill>
        Every day for three days, you will log into this website with the
        username and password provided to you. You will have a total of forty
        coins to begin with. After this, you will either gain or lose coins
        based on your performance. The final amount of coins determines how much
        money you will finally earn.
      </Paragraph>
      <Paragraph fill>
        You will read the posts presented to you. You will then try to
        understand if the post is true, false, or wholesome. To help you, we
        have included some more additional information, which you can read by
        clicking “read more”. Your task is then to react or not react and share
        or not share the post. For every share of true information, you will be
        gain a few coins. For every share of false information, a few of your
        coins will be taken away. Here, 1 coin = 1 Rupee.
      </Paragraph>
      <Paragraph fill>
        You will complete the study over three days. After this, we will ask you
        about your experience with the study.
      </Paragraph>

      <Box width={"large"}>
        <img src={new URL("../assets/monetary-about.png", import.meta.url)} />
      </Box>

      <Text weight={500}>Why do the number of coins I have keep changing?</Text>
      <Paragraph fill>
        You will gain or lose a few coins based on your sharing behaviours. That
        is, if you share true information, you will receive a few coins. If you
        share false information, you will lose a few coins. Nothing will happen
        to your coins if you share wholesome information.
      </Paragraph>
      <Text weight={500}>Do I have to share/react to every post?</Text>
      <Paragraph fill>
        You do not have to share or react to every post.
      </Paragraph>

      <Text weight={500}>What are you trying to study?</Text>
      <Paragraph fill>
        We are trying to study how people naturally share information on social
        media.
      </Paragraph>

      <Text weight={500}>Why do I not get coins on the first day?</Text>
      <Paragraph fill>
        We want to see how you share content naturally on Day 1; on Day 2 and
        Day 3 you will receive/lose coins based on your sharing behavior.
      </Paragraph>

      <Text weight={500}>When will I get real money?</Text>
      <Paragraph fill>
        You will get real money ten days after you finish all three days of this
        study. Please do not close the tab till you get a “Thank you” message
        from us for smoother processing of your payment.
      </Paragraph>

      <Text weight={500}>When do I have to log in again?</Text>
      <Paragraph fill>
        You will log in every day for three days. You can log back in after 24
        hours; so if you finish your task by 10AM on Day 1, you can log in
        anytime after 10AM on Day 2.
      </Paragraph>

      <Text weight={500}>
        I can’t find my username and password. What do I do?
      </Text>
      <Paragraph fill>
        Please write to us at{" "}
        <Anchor target={"_blank"} href={"mailto:ar@monkprayogshala.in"}>
          ar@monkprayogshala.in.
        </Anchor>
      </Paragraph>

      <Text weight={500}>
        I want my friends to also participate in this study. Can they?
      </Text>
      <Paragraph fill>
        They can participate in this study by first
        <Anchor
          target={"_blank"}
          href={"https://uconn.co1.qualtrics.com/jfe/form/SV_9AA3gVCYPmUyRZs"}
        >
          {" "}
          filling out this form.
        </Anchor>
        We will contact them if they are eligible.
      </Paragraph>

      <Text weight={500}>I have more questions. Who do I contact?</Text>
      <Paragraph fill>
        You can ask us questions by writing to
        <Anchor target={"_blank"} href={"mailto:ar@monkprayogshala.in"}>
          {" "}
          ar@monkprayogshala.in
        </Anchor>
      </Paragraph>
    </Box>
  );
}

function AboutVanity() {
  return (
    <Box>
      <Text weight={500}>What do I have to do?</Text>
      <Paragraph fill>
        Every day for three days, you will log into this website with the
        username and password provided to you.
      </Paragraph>
      <Paragraph fill>
        You will read the posts presented to you. You will then try to
        understand if the post is true, false, or wholesome. To help you, we
        have included some more additional information, which you can read by
        clicking “read more”. Your task is then to react or not react and share
        or not share the post. For every share of true information, you will be
        gain a few likes. For every share of false information, a few of your
        likes will be taken away.
      </Paragraph>
      <Paragraph fill>
        You will complete the study over three days. After this, we will ask you
        about your experience with the study.
      </Paragraph>
      <Box width={"large"}>
        <img src={new URL("../assets/monetary-about.png", import.meta.url)} />
      </Box>

      <Text weight={500}>
        Why do the number of followers I have keep changing?
      </Text>
      <Paragraph fill>
        You will gain or lose a few likes based on your sharing behaviours. That
        is, if you share true information, you will receive a few likes. If you
        share false information, you will lose a few likes. Nothing will happen
        to your likes if you share wholesome information.
      </Paragraph>

      <Text weight={500}>Do I have to share/react to every post?</Text>
      <Paragraph fill>
        You do not have to share or react to every post.
      </Paragraph>

      <Text weight={500}>What are you trying to study?</Text>
      <Paragraph fill>
        We are trying to study how people naturally share information on social
        media.
      </Paragraph>

      <Text weight={500}>Why do I not get followers on the first day?</Text>
      <Paragraph fill>
        We want to see how you share content naturally on Day 1; on Day 2 and
        Day 3 you will receive/lose followers based on your sharing behavior.
      </Paragraph>

      <Text weight={500}>When will I get real money?</Text>
      <Paragraph fill>
        You will get real money ten days after you finish all three days of this
        study. Please do not close the tab till you get a “Thank you” message
        from us for smoother processing of your payment.
      </Paragraph>

      <Text weight={500}>When do I have to log in again?</Text>
      <Paragraph fill>
        You will log in every day for three days. You can log back in after 24
        hours; so if you finish your task by 10AM on Day 1, you can log in
        anytime after 10AM on Day 2.
      </Paragraph>

      <Text weight={500}>
        I can’t find my username and password. What do I do?
      </Text>
      <Paragraph fill>
        Please write to us at{" "}
        <Anchor target={"_blank"} href={"mailto:ar@monkprayogshala.in"}>
          ar@monkprayogshala.in.
        </Anchor>
      </Paragraph>

      <Text weight={500}>
        I want my friends to also participate in this study. Can they?
      </Text>
      <Paragraph fill>
        They can participate in this study by first
        <Anchor
          target={"_blank"}
          href={"https://uconn.co1.qualtrics.com/jfe/form/SV_9AA3gVCYPmUyRZs"}
        >
          {" "}
          filling out this form.
        </Anchor>
        We will contact them if they are eligible.
      </Paragraph>

      <Text weight={500}>I have more questions. Who do I contact?</Text>
      <Paragraph fill>
        You can ask us questions by writing to
        <Anchor target={"_blank"} href={"mailto:ar@monkprayogshala.in"}>
          {" "}
          ar@monkprayogshala.in
        </Anchor>
      </Paragraph>
    </Box>
  );
}

export function About() {
  const [userMetric, setUserMetric] = useRecoilState(UserMetric);
  const { data: dataUserMetrics } = useApi(configMetrics.userMetrics, true);

  useEffect(() => {
    console.log({ dataUserMetrics });
    if (dataUserMetrics) {
      setUserMetric(dataUserMetrics);
    }
  }, [dataUserMetrics]);
  return (
    <Section>
      <Heading>About</Heading>
      {userMetric.type === "MONETARY" ? <AboutMonetary /> : null}
      {userMetric.type === "VANITY" ? <AboutVanity /> : null}
      {userMetric.type != "MONETARY" && userMetric.type != "VANITY" ? (
        <Text>Unexpected State</Text>
      ) : null}
      <Box></Box>
    </Section>
  );
}
