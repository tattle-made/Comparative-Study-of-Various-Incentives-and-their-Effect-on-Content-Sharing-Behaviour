import { useState, useEffect } from "react";
import { Grommet, Box, Heading, Text, Button } from "grommet";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import Theme from "~/components/atoms/Theme";
import { Feed } from "./Feed";
import { NotificationContext, UserContext } from "~/components/atoms/context";

export function Home() {
  const [msg, setMsg] = useState("Default");
  const [notification, setNotification] = useState(undefined);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (user === undefined) {
      console.log("no user");
      // navigate to home if user is undefined
    }
  });

  function showNotification(message) {
    setTimeout(() => {
      setNotification(undefined);
    }, 1500);
    setNotification({ message });
  }

  function clickLogout() {
    setUser(undefined);
  }

  return (
    <Grommet full theme={Theme}>
      <NotificationContext.Provider value={{ notification, showNotification }}>
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Box pad={"small"} gap={"large"} direction={"row"} align={"center"}>
              <Heading level={3}>Meshi</Heading>
              {notification ? (
                <Text color={"status-error"}>{notification.message}</Text>
              ) : null}
              <Box flex={"grow"}></Box>
              {user ? (
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
          </BrowserRouter>
        </UserContext.Provider>
      </NotificationContext.Provider>
    </Grommet>
  );
}
