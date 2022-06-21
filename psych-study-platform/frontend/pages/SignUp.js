import { Section } from "../components/atoms/Section";
import { Box, Heading, Paragraph, Text, Anchor } from "grommet";

export function SignUp() {
  return (
    <Box width={"large"} alignContent={"center"}>
      <Section>
        <Paragraph>
          Meshi is a study to understand how people naturally share information
          on our social media platform.
        </Paragraph>
        <Paragraph>
          This study is being conducted by Dr. Hansika Kapoor, Research Author
          at the Department of Psychology,{" "}
          <Anchor href={"https://www.monkprayogshala.in/"} target={"_blank"}>
            {" "}
            Monk Prayogshala
          </Anchor>
          , Arathy Puthillam, Research Assistant at the Department of
          Psychology,
          <Anchor href={"https://www.monkprayogshala.in/"} target={"_blank"}>
            {" "}
            Monk Prayogshala
          </Anchor>
          , along with Tarunima Prabhakar and Denny George at{" "}
          <Anchor href="https://tattle.co.in/" target={"_blank"}>
            {" "}
            Tattle Civic Tech.
          </Anchor>
        </Paragraph>
        <Paragraph>
          <Text>
            Please{" "}
            <Anchor
              href={
                "https://uconn.co1.qualtrics.com/jfe/form/SV_9AA3gVCYPmUyRZs"
              }
              target={"_blank"}
            >
              fill in this form
            </Anchor>
            <Text> or write to </Text>
            <Anchor href="mailto:ar@monkprayosghala.in" target={"_blank"}>
              ar@monkprayosghala.in
            </Anchor>{" "}
            to participate.
          </Text>
        </Paragraph>
        <Paragraph>
          All participants will receive at least INR 200 for participating in
          this study!
        </Paragraph>
      </Section>
    </Box>
  );
}
