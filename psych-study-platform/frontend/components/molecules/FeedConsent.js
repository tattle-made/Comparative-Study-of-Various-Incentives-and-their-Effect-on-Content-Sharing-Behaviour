import { useEffect } from "react";
import { Box, Heading, Text, Paragraph, Button } from "grommet";
import { Section } from "../atoms/Section";
import { config as configStudyPhase } from "~/api/study-phase/request";
import { useRecoilState } from "recoil";
import { UserState, UserMetric } from "~/UserState";
import { useApi } from "~/api/hook";
import { useNavigate } from "react-router-dom";

function ConsentFormMonetary() {
  return (
    <Box>
      <Heading>Consent Form</Heading>
      <Paragraph fill>
        Please consider the following information before deciding to participate
        in this research.
      </Paragraph>
      <Text weight={500}>Purpose </Text>
      <Paragraph fill>To understand communication patterns.</Paragraph>
      <Text weight={500}>Who is conducting this study</Text>
      <Paragraph fill>
        This study is being conducted by Dr. Hansika Kapoor, Research Author at
        the Department of Psychology, Monk Prayogshala (hk@monkprayogshala.in),
        Arathy Puthillam, Research Assistant at the Department of Psychology,
        Monk Prayogshala (ar@monkprayogshala.in), Tarunima Prabhakar, and Denny
        George.
      </Paragraph>
      <Text weight={500}>Has this study been approved?</Text>
      <Paragraph fill>
        Yes, this study has received Ethical Approval from the IRB at Monk
        Prayogshala (#086-022) in March, 2022. For queries regarding the same,
        you may contact hk@monkprayogshala.in.
      </Paragraph>
      <Text weight={500}>What will you do?</Text>
      <Paragraph fill>
        You will be sent five messages on the first day, and ten each after that
        for two consecutive days. You may choose to share or not share those
        messages. On the first day, we will see how you naturally share content.
        On second and third days, you will be rewarded for sharing true content
        by adding Rs 10 in your wallet and penalised for sharing false content
        by deduction of Rs 4 from your wallet. You will have to read the message
        thoroughly and use your judgement to classify which content is true,
        which is false, and which would spread joy.
      </Paragraph>
      <Box width={"large"}>
        <img
          src={new URL("../../assets/monetary-guide.png", import.meta.url)}
        />
      </Box>
      <Text weight={500}>Risks</Text>
      <Paragraph fill>
        There are minimum anticipated risks with participating in this study. If
        at any time you feel uncomfortable, you may close the tab and there
        would be no consequence to your actions.
      </Paragraph>
      <Text weight={500}>Benefits </Text>
      <Paragraph fill>
        You would be provided with Rs 200 at the end of the three days. In
        addition, you stand a chance to win upto Rs 120 (Rs 200 + Rs 120 = Rs
        320). Further, you would be entered into a raffle where you can win one
        out of five Amazon vouchers worth Rs. 750/-! Your contact information
        will only be used to contact you for further participation and will not
        be associated with your identity in any way.{" "}
      </Paragraph>
      <Text weight={500}>Confidentiality </Text>
      <Paragraph fill>
        Your participation will remain strictly confidential and your responses
        will not be associated with your identity. The results may be published
        in a research paper or a popular press article, and you may request to
        have a copy of the same once it is published. Please note that the
        researchers cannot provide you with your individual data, since all
        analyses will be conducted at the group-level.
      </Paragraph>
      <Text weight={500}>Participation and Withdrawal</Text>
      <Paragraph fill>
        Your participation in this study is completely voluntary, and you may
        withdraw at any time without penalty. If at any time during the study
        you begin to feel uncomfortable, you may exit the study by closing your
        browser window. However, once you’ve submitted your responses, you will
        have a two-week window, should you choose to withdraw your data. This is
        because once data analysis begins, it will be difficult to extract
        individual data from the pool.
      </Paragraph>
      <Text weight={500}>Contact </Text>
      <Paragraph fill>
        If you have any questions, comments or feedback regarding this study,
        you can contact us at hk@monkprayogshala.in.
      </Paragraph>
      <Paragraph fill>
        By clicking on the continue button, you are stating that you are over 18
        years of age, and that you understand the provided information and
        consent to participate in the study being conducted.
      </Paragraph>
    </Box>
  );
}

function ConsentFormVanity() {
  return (
    <Box>
      <Heading>Consent Form</Heading>
      <Paragraph fill>
        Please consider the following information before deciding to participate
        in this research.
      </Paragraph>
      <Text weight={500}>Purpose </Text>
      <Paragraph fill>To understand communication patterns.</Paragraph>
      <Text weight={500}>Who is conducting this study</Text>
      <Paragraph fill>
        This study is being conducted by Dr. Hansika Kapoor, Research Author at
        the Department of Psychology, Monk Prayogshala (hk@monkprayogshala.in),
        Arathy Puthillam, Research Assistant at the Department of Psychology,
        Monk Prayogshala (ar@monkprayogshala.in), Tarunima Prabhakar, and Denny
        George.
      </Paragraph>
      <Text weight={500}>Has this study been approved?</Text>
      <Paragraph fill>
        Yes, this study has received Ethical Approval from the IRB at Monk
        Prayogshala (#086-022) in March, 2022. For queries regarding the same,
        you may contact hk@monkprayogshala.in.
      </Paragraph>
      <Text weight={500}>What will you do?</Text>
      <Paragraph fill>
        You will be sent five messages on the first day, and ten each after that
        for two consecutive days. You may choose to share or not share those
        messages. On the first day, we will see how you naturally share content.
        On second and third days, you will be rewarded for sharing true content;
        you will get 100 followers for sharing true content. You will be
        penalised for sharing false content by deduction of 40 followers. You
        will have to read the message thoroughly and use your judgement to
        classify which content is true, which is false, and which would spread
        joy.
      </Paragraph>
      <Box width={"large"}>
        <img src={new URL("../../assets/vanity-guide.png", import.meta.url)} />
      </Box>
      <Text weight={500}>Risks</Text>
      <Paragraph fill>
        There are minimum anticipated risks with participating in this study. If
        at any time you feel uncomfortable, you may close the tab and there
        would be no consequence to your actions.
      </Paragraph>
      <Text weight={500}>Benefits </Text>
      <Paragraph fill>
        You would be provided with Rs 200 at the end of three days. Further, you
        would be entered into a raffle where you can win one out of five Amazon
        vouchers worth Rs. 750/-! Your contact information will only be used to
        contact you for further participation and will not be associated with
        your identity in any way.
      </Paragraph>
      <Text weight={500}>Confidentiality </Text>
      <Paragraph fill>
        Your participation will remain strictly confidential and your responses
        will not be associated with your identity. The results may be published
        in a research paper or a popular press article, and you may request to
        have a copy of the same once it is published. Please note that the
        researchers cannot provide you with your individual data, since all
        analyses will be conducted at the group-level.
      </Paragraph>
      <Text weight={500}>Participation and Withdrawal</Text>
      <Paragraph fill>
        Your participation in this study is completely voluntary, and you may
        withdraw at any time without penalty. If at any time during the study
        you begin to feel uncomfortable, you may exit the study by closing your
        browser window. However, once you’ve submitted your responses, you will
        have a two-week window, should you choose to withdraw your data. This is
        because once data analysis begins, it will be difficult to extract
        individual data from the pool.
      </Paragraph>
      <Text weight={500}>Contact </Text>
      <Paragraph fill>
        If you have any questions, comments or feedback regarding this study,
        you can contact us at hk@monkprayogshala.in.
      </Paragraph>
      <Paragraph fill>
        By clicking on the continue button, you are stating that you are over 18
        years of age, and that you understand the provided information and
        consent to participate in the study being conducted.
      </Paragraph>
    </Box>
  );
}

export function FeedConsent() {
  const { data, trigger } = useApi(configStudyPhase.checkAndUpdate);
  let navigate = useNavigate();
  const [userMetric, setUserMetric] = useRecoilState(UserMetric);
  const [user, setUser] = useRecoilState(UserState);

  useEffect(() => {
    if (data && data.msg === "done") {
      console.log({ HERE: data });
      navigate(0);
    }
  }, [data]);

  async function clickContinue() {
    await trigger();
  }

  function clickCancel() {
    setUser({});
  }

  return (
    <Section>
      <Box>
        <Box height={"2em"} />
        {userMetric.type === "MONETARY" ? <ConsentFormMonetary /> : null}
        {userMetric.type === "VANITY" ? <ConsentFormVanity /> : null}
        <Box gap={"small"}>
          <Button
            onClick={clickContinue}
            primary
            alignSelf="start"
            label={"I consent to participate"}
          ></Button>
          <Button
            onClick={clickCancel}
            alignSelf="start"
            label={"I do not consent to participate"}
          ></Button>
        </Box>
      </Box>
    </Section>
  );
}
