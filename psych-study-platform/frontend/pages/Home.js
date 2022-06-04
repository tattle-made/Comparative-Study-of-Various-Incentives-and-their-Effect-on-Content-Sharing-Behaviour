import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grommet, Box, Heading, Text, Button } from "grommet";
import { HelpOption } from "grommet-icons";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Feed } from "./Feed";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserState, UserLoginStatusState } from "~/UserState";
import { Notification } from "~/components/atoms/Notification";
import { About } from "./About";

export function Home() {
  const [msg, setMsg] = useState("Default");
  const [user, setUser] = useRecoilState(UserState);
  const userLoginStatus = useRecoilValue(UserLoginStatusState);
  let navigate = useNavigate();

  function clickLogout() {
    setUser({});
  }

  useEffect(() => {
    if (!userLoginStatus) {
      navigate("/");
    }
  }, [userLoginStatus]);

  function helpClicked() {
    navigate("/about");
  }

  return (
    <Box fill>
      <Box pad={"small"} gap={"large"} direction={"row"} align={"center"}>
        <Heading level={3}>Meshi</Heading>

        <Box flex={"grow"}></Box>
        {userLoginStatus ? (
          <Box gap={"small"} direction={"row"} align={"center"}>
            <Button
              icon={<HelpOption size={"medium"} />}
              onClick={helpClicked}
            />
            <Button primary label={"Logout"} onClick={clickLogout}></Button>
          </Box>
        ) : null}
      </Box>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/about" element={<About />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
      <Notification />
    </Box>
  );
}
