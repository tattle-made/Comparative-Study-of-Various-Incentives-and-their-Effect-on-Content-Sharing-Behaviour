import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "grommet";
import { User } from "grommet-icons";
import { Section } from "~/components/atoms/Section";
import { useApi } from "~/api/hook";
import { config } from "~/api/feed/request";
import { UserFeed } from "~/components/molecules/UserFeed";
import { UserState } from "~/UserState";
import { FeedOnboarding } from "../components/molecules/FeedOnboarding";
import { FeedPostTestSurvey } from "../components/molecules/FeedPostTestSurvey";
import { FeedFinished } from "../components/molecules/FeedFinished";

export function Feed() {
  let navigate = useNavigate();
  const [msg, setMsg] = useState("Default");
  const [user, setUser] = useRecoilState(UserState);
  const { data } = useApi(config.getFeed, true);

  useEffect(() => {
    console.log({ feed: data });
  }, [data]);

  return (
    <Box>
      {user.id ? (
        <Box>
          <Section>
            <Box round={"small"} border pad={"small"}>
              <Box direction={"row"} gap={"small"} align={"center"}>
                <User size={"large"} />
                <Text weight={800} size={"xxlarge"}>
                  {"hi"}
                </Text>
              </Box>
            </Box>
            <Box flex={"grow"}></Box>
          </Section>
          {/* <Text>{JSON.stringify(data)}</Text> */}
          {data && data.type === "POSTS" ? <UserFeed data={data} /> : null}
          {data && data.type === "PAGE" && data.page === "ONBOARDING" ? (
            <FeedOnboarding />
          ) : null}
          {data && data.type === "PAGE" && data.page === "POST_TEST_SURVEY" ? (
            <FeedPostTestSurvey />
          ) : null}
          {data && data.type === "PAGE" && data.page === "FINISHED" ? (
            <FeedFinished />
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
}
