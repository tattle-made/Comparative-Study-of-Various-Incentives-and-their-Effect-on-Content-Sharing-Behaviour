import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grommet, Box, Heading, Text, Button } from "grommet";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Feed } from "./Feed";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserState, UserLoginStatusState } from "~/UserState";

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

  return (
    <Box>
      <Box pad={"small"} gap={"large"} direction={"row"} align={"center"}>
        <Heading level={3}>Meshi</Heading>
        {/* {notification ? (
          <Text color={"status-error"}>{notification.message}</Text>
        ) : null} */}
        <Box flex={"grow"}></Box>
        {userLoginStatus ? (
          <Button primary label={"Logout"} onClick={clickLogout}></Button>
        ) : null}
      </Box>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </Box>
  );
}
