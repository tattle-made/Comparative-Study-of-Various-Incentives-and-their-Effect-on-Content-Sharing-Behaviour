import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text } from "grommet";
import { User } from "grommet-icons";
import { Section } from "~/components/atoms/Section";
import { useApi } from "~/api/hook";
import { config } from "~/api/feed/request";
import { config as configShare } from "~/api/share/request";
import { UserFeed } from "~/components/molecules/UserFeed";
import { UserState, UserMetric } from "~/UserState";
import { FeedOnboarding } from "../components/molecules/FeedOnboarding";
import { FeedPostTestSurvey } from "../components/molecules/FeedPostTestSurvey";
import { FeedFinished } from "../components/molecules/FeedFinished";
import { usePageVisibility } from "~/components/atoms/usePageVisibility";
import { UserMetricLabelState } from "../UserState";
import { Offline, Online } from "react-detect-offline";

export function Feed() {
  let navigate = useNavigate();
  const [msg, setMsg] = useState("Default");
  const [user, setUser] = useRecoilState(UserState);
  const [userMetric, setUserMetric] = useRecoilState(UserMetric);
  const userMetricLabel = useRecoilValue(UserMetricLabelState);
  const { data } = useApi(config.getFeed, true);
  const { data: dataUserMetrics } = useApi(configShare.userMetrics, true);
  const isVisible = usePageVisibility();

  useEffect(() => {
    console.log({ feed: data });
  }, [data]);

  useEffect(() => {
    console.log({ dataUserMetrics });
    if (dataUserMetrics) {
      setUserMetric(dataUserMetrics);
    }
  }, [dataUserMetrics]);

  useEffect(() => {
    console.log(`page is visible ${isVisible}`);
  }, [isVisible]);

  return (
    <Box>
      <Online>
        {user.id ? (
          <Box>
            <Section>
              <Box round={"small"} border flex={"grow"} pad={"small"}>
                <Box direction={"row"} gap={"small"} align={"center"}>
                  <User size={"large"} />
                  <Box dir="row">
                    <Text weight={300} size={"xxlarge"}>
                      {user.username}
                    </Text>
                    <Text weight={800} size={"xxlarge"} color={"brand"}>
                      {userMetricLabel}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Section>
            {/* <Text>{JSON.stringify(data)}</Text> */}
            {data && data.type === "POSTS" ? <UserFeed data={data} /> : null}
            {data && data.type === "PAGE" && data.page === "ONBOARDING" ? (
              <FeedOnboarding />
            ) : null}
            {data &&
            data.type === "PAGE" &&
            data.page === "POST_TEST_SURVEY" ? (
              <FeedPostTestSurvey />
            ) : null}
            {data && data.type === "PAGE" && data.page === "FINISHED" ? (
              <FeedFinished />
            ) : null}
          </Box>
        ) : null}
      </Online>
      <Offline>
        <Heading>We've lost internet connectivity.</Heading>
        <Text>
          This test requires a stable internet connection to accurately measure
          your interactions. Please resume once the internet is back.
        </Text>
      </Offline>
    </Box>
  );
}
