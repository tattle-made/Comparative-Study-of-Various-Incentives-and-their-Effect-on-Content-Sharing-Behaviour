import { useState, useEffect } from "react";
import { Grommet, Box, Heading } from "grommet";
import axios from "axios";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FeedVanity } from "./FeedVanity";
import { FeedMonetary } from "./FeedMonetary";
import { Login } from "./Login";
import Theme from "../atoms/Theme";
import { Feed } from "./Feed";

export function Home() {
  const [msg, setMsg] = useState("Default");

  return (
    <Grommet full theme={Theme}>
      <BrowserRouter>
        <Box pad={"small"}>
          <Heading level={3}>Meshi</Heading>
        </Box>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed-vanity" element={<FeedVanity />}></Route>
          <Route path="/feed-monetary" element={<FeedMonetary />}></Route>
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
    </Grommet>
  );
}
