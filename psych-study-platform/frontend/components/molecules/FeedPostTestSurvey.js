import { Section } from "../atoms/Section";
import { config } from "~/api/study-phase/request";
import { config as configSurvey } from "~/api/survey-form/request";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useApi } from "~/api/hook";
import {
  Box,
  Heading,
  Text,
  Button,
  Form,
  FormField,
  RadioButtonGroup,
} from "grommet";
import { UserMetric } from "~/UserState";

const FORM_OPTIONS = [
  { label: "Never", value: 0 },
  { label: "Rarely", value: 1 },
  { label: "Once a session", value: 2 },
  { label: "A few times a session", value: 3 },
  { label: "All the time", value: 4 },
];

export function FeedPostTestSurvey() {
  const { data, trigger } = useApi(config.checkAndUpdate);
  let navigate = useNavigate();
  const [userMetric, setUserMetric] = useRecoilState(UserMetric);
  const { trigger: triggerSaveSurvey } = useApi(configSurvey.saveSurveyForm);
  const [formSubmitStatus, setFormSubmitStatus] = useState(false);

  useEffect(() => {
    if (data && data.msg === "done") {
      console.log({ HERE: data });
      navigate(0);
    }
  }, [data]);

  useEffect(() => {
    console.log({ userMetric });
  }, [userMetric]);

  async function submitClicked({ value }) {
    console.log(value);
    await triggerSaveSurvey({ survey: value });
    await trigger();
    setFormSubmitStatus(true);
  }

  return (
    <Section>
      <Box>
        <h1>Feed Post Test Survey</h1>{" "}
        <Form onSubmit={submitClicked}>
          <FormField
            label={"1. How often did you read the whole message?"}
            name="q_1"
            htmlFor="q_1"
          >
            <RadioButtonGroup
              name="q_1"
              id="q_1"
              options={FORM_OPTIONS}
            ></RadioButtonGroup>
          </FormField>

          <FormField
            label={
              "2. To what extent were you familiar with the messages shown to you?"
            }
            name="q_2"
            htmlFor="q_2"
          >
            <RadioButtonGroup
              name="q_2"
              id="q_2"
              options={FORM_OPTIONS}
            ></RadioButtonGroup>
          </FormField>

          <FormField
            label={"3. How many times did you Google the information provided?"}
            name="q_3"
            htmlFor="q_3"
          >
            <RadioButtonGroup
              name="q_3"
              id="q_3"
              options={FORM_OPTIONS}
            ></RadioButtonGroup>
          </FormField>

          {userMetric.type === "MONETARY" ? (
            <Box>
              <FormField
                label={
                  "4. To what extent were you thinking about maximising your earnings while deciding to share/not share a message?"
                }
                name="q_4"
                htmlFor="q_4"
              >
                <RadioButtonGroup
                  name="q_4"
                  id="q_4"
                  options={FORM_OPTIONS}
                ></RadioButtonGroup>
              </FormField>

              <FormField
                label={
                  "5. To what extent were you thinking about maximizing money while sharing the messages?"
                }
                name="q_5"
                htmlFor="q_5"
              >
                <RadioButtonGroup
                  name="q_5"
                  id="q_5"
                  options={FORM_OPTIONS}
                ></RadioButtonGroup>
              </FormField>
            </Box>
          ) : null}

          {userMetric.type === "VANITY" ? (
            <Box>
              <FormField
                label={
                  "4. To what extent were you thinking about maximising your likes while deciding to share/not share a message?"
                }
                name="q_4"
                htmlFor="q_4"
              >
                <RadioButtonGroup
                  name="q_4"
                  id="q_4"
                  options={FORM_OPTIONS}
                ></RadioButtonGroup>
              </FormField>

              <FormField
                label={
                  "5. To what extent were you thinking about maximizing likes while sharing the messages?"
                }
                name="q_5"
                htmlFor="q_5"
              >
                <RadioButtonGroup
                  name="q_5"
                  htmlFor="q_5"
                  options={FORM_OPTIONS}
                ></RadioButtonGroup>
              </FormField>
            </Box>
          ) : null}
          <Box height={"2em"}></Box>
          <Button type="submit" primary label="Submit" alignSelf="start" />
        </Form>
      </Box>
    </Section>
  );
}
