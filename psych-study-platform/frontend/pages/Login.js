import { useEffect, useState, useContext } from "react";
import { useRecoilState } from "recoil";
import {
  Box,
  Heading,
  Text,
  Paragraph,
  Anchor,
  Button,
  TextInput,
  Form,
  FormField,
  TextInput,
} from "grommet";
import { Section } from "~/components/atoms/Section";
import { useNavigate } from "react-router-dom";
import { useApi } from "~/api/hook";
import { config } from "~/api/auth/requests";
import { UserState } from "~/UserState";

export function Login() {
  let navigate = useNavigate();
  let { data: userData, err, loading, trigger } = useApi(config.loginUser);
  const [user, setUser] = useRecoilState(UserState);

  async function loginPressed({ value }) {
    await trigger(value);
  }

  useEffect(() => {
    if (userData) {
      navigate("/feed");
      setUser(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (user.id) {
      navigate("/feed");
    }
  }, [user]);

  return (
    <Section>
      <Heading level={2}>Login</Heading>
      <Form onSubmit={loginPressed}>
        <Box gap={"large"}>
          <Box>
            <FormField name="name" htmlFor="username-id" label="Username">
              <TextInput id="username-id" name="username" size={"xxlarge"} />
            </FormField>
            <FormField name="password" htmlFor="password-id" label="Password">
              <TextInput
                id="password-id"
                name="password"
                type={"password"}
                size={"xxlarge"}
              />
            </FormField>
          </Box>

          <Button type="submit" primary label="Login" />
          {loading ? <Text>loading...</Text> : null}
        </Box>
      </Form>
      <Box height={"2em"}>
        <Paragraph fill>
          <Text>Don't have a username or password? </Text>
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
      </Box>
      <Box flex={"grow"} />

      <Text color={"dark-4"} size={"xsmall"}>
        {process.env.NODE_ENV}
      </Text>
    </Section>
  );
}
