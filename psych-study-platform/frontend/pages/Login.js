import { useState } from "react";
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
import { Section } from "../atoms/Section";
import { useNavigate } from "react-router-dom";

const users = {
  user_monetary: "money1234",
  user_vanity: "vanity1234",
};

// return : valid, user's group type
// or invalid
function login(loginForm) {
  console.log(loginForm);
  if (users[loginForm.username]) {
    if (users[loginForm.username] === loginForm.password) {
      const { username } = loginForm;
      if (username === "user_monetary") {
        return {
          group: "monetization",
          user: {
            id: 1,
            username: username,
          },
        };
      } else if (username === "user_vanity") {
        return {
          group: "vanity",
          user: {
            id: 2,
            username: username,
          },
        };
      } else {
        return undefined;
      }
    }
  } else {
    return undefined;
  }
}

export function Login() {
  let navigate = useNavigate();
  function loginPressed({ value }) {
    const loginResult = login(value);
    if (loginResult === undefined) {
      alert("Unable to Login");
    } else {
      if (loginResult === undefined) {
        alert("Unexpected User");
      } else {
        navigate("/feed", { state: loginResult });
      }
    }
  }
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
        </Box>
      </Form>
    </Section>
  );
}
