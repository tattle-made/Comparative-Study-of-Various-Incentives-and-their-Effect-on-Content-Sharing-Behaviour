import { useEffect, useState, useContext } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  TextInput,
  Form,
  FormField,
  TextInput,
} from "grommet";
import { Section } from "~/components/atoms/Section";
import { useNavigate } from "react-router-dom";
import { useApi } from "~/api/hook";
import { PostRequestLoginMaker } from "~/api/auth/requests";
import { NotificationContext, UserContext } from "~/components/atoms/context";

export function Login() {
  let navigate = useNavigate();
  const { user: userInContext, setUser } = useContext(UserContext);
  const { notification, showNotification } = useContext(NotificationContext);
  let { data: user, err, loading, trigger } = useApi(PostRequestLoginMaker());

  async function loginPressed({ value }) {
    await trigger(value);
  }

  useEffect(() => {
    if (user) {
      setUser(user);
      navigate("/feed", { state: { user } });
    }
  }, [user]);

  useEffect(() => {
    if (err) showNotification("Error");
  }, [err]);

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
    </Section>
  );
}
