import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { config as configEvent } from "~/api/events/request";
import { makePostPostMetricPayload, EventPayload } from "~/api/events/payload";
import { Box, Heading, Text, Button, Paragraph, Button } from "grommet";
import { ShareOption } from "grommet-icons";
import {
  SnappyVerticalScrollContainer,
  SnappyVerticalScrollChild,
} from "~/components/atoms/SnappyScroll";
import { useApi } from "~/api/hook";
import { config } from "~/api/study-phase/request";
import { config as configMetrics } from "~/api/metrics/request";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { UserMetric } from "~/UserState";
import { NotificationState } from "~/NotificationState";
import { Section } from "../atoms/Section";

function StatefulBox({ currentState, value, children }) {
  return currentState === value ? (
    <Box background={"light-4"} round pad={"small"}>
      {children}
    </Box>
  ) : (
    <Box pad={"small"}>{children}</Box>
  );
}

function Reactions({ metrics, postId }) {
  const { data, err, loading, trigger } = useApi(configEvent.createEvent);
  const [selectedReaction, setSelectedReaction] = useState("");
  const [notification, setNotification] = useRecoilState(NotificationState);
  const {
    data: dataPostPostMetric,
    err: errPostPostMetric,
    trigger: triggerPostPostMetric,
  } = useApi(configMetrics.postPostMetrics);

  useEffect(() => {
    if (metrics.REACTION) {
      setSelectedReaction(metrics.REACTION);
    }
  }, [metrics]);

  useEffect(() => {
    if (errPostPostMetric) {
      setNotification({ message: "Unable to save reaction. Please try again" });
      setSelectedReaction("");
    }
  }, [errPostPostMetric]);

  async function clickReaction(reaction) {
    if (selectedReaction === "") {
      setSelectedReaction(reaction);
      await triggerPostPostMetric(makePostPostMetricPayload(reaction)(postId));
    } else {
      setNotification({ message: "You can not change your Reaction" });
    }
  }

  return (
    <Box direction={"row"} gap={"small"}>
      <StatefulBox currentState={selectedReaction} value={"HAPPY"}>
        <Button plain onClick={() => clickReaction("HAPPY")}>
          <Box align="center">
            <Text size={"40px"}>🙂</Text>
            <Text size={"xsmall"}> happy</Text>
          </Box>
        </Button>
      </StatefulBox>
      <StatefulBox currentState={selectedReaction} value={"ANGRY"}>
        <Button plain onClick={() => clickReaction("ANGRY")}>
          <Box align="center">
            <Text size={"40px"}>😠</Text>
            <Text size={"xsmall"}> angry</Text>
          </Box>
        </Button>
      </StatefulBox>
      <StatefulBox currentState={selectedReaction} value={"DISGUST"}>
        <Button plain onClick={() => clickReaction("DISGUST")}>
          <Box align="center">
            <Text size={"40px"}>🤢</Text>
            <Text size={"xsmall"}> disgust</Text>
          </Box>
        </Button>
      </StatefulBox>
    </Box>
  );
}

/**
 *
 * `shared` is used to keep track of the share button's state.
 * Its possible values are - DEFAULT, IN_PROGRESS<
 */
function FeedItem({ ix, item }) {
  const [expand, setExpand] = useState(false);
  const [shared, setShared] = useState(false);
  const { data, err, loading, trigger } = useApi(configEvent.createEvent);
  const {
    data: dataPostPostMetric,
    err: errPostPostMetric,
    trigger: triggerPostPostMetric,
  } = useApi(configMetrics.postPostMetrics);
  const { ref, inView, entry } = useInView();
  const [, setUserMetric] = useRecoilState(UserMetric);
  const [, setNotification] = useRecoilState(NotificationState);

  useEffect(() => {
    // console.log(`ix ${ix} is inview : ${inView}`);
    async function recordInView() {
      await trigger({
        postId: item.id,
        name: "IN_VIEW",
        value: inView ? "YES" : "NO",
      });
    }
    recordInView();
  }, [inView]);

  useEffect(() => {
    if (dataPostPostMetric && dataPostPostMetric.userMetric)
      setUserMetric(dataPostPostMetric.userMetric);
  }, [dataPostPostMetric]);

  async function clickShare() {
    if (!shared) {
      setShared(!shared);
      triggerPostPostMetric(EventPayload.SHARE_YES(item.id));
    } else {
      setNotification({ message: "You can not Undo your share" });
    }
  }

  useEffect(() => {
    console.log("item changed", item.metrics);
    if (item.metrics.SHARE === "YES") {
      setShared(true);
    }
    if (item.metrics.READ_MORE === "YES") {
      setExpand(true);
    }
  }, [item]);

  async function clickReadMore() {
    setExpand(!expand);
    const { READ_MORE_YES, READ_MORE_NO } = EventPayload;
    await triggerPostPostMetric(
      expand ? READ_MORE_NO(item.id) : READ_MORE_YES(item.id)
    );
  }

  // function testClicked() {
  //   console.log({ item });
  // }

  return (
    <SnappyVerticalScrollChild key={ix} ix={ix} ref={ref}>
      <Box margin={"medium"} pad={"medium"} border round gap={"medium"}>
        <Box>
          <Heading level={3} fill>
            {item.headlineText}
          </Heading>
          <Button plain label={"Read More"} onClick={clickReadMore} />
          {expand ? (
            <Paragraph fill size="medium">
              {item.readMoreText}
            </Paragraph>
          ) : null}
        </Box>
        <Box direction="row" gap={"small"} align={"center"}>
          <Reactions metrics={item.metrics} postId={item.id} />
          <Box
            hoverIndicator={true}
            focusIndicator={false}
            onClick={clickShare}
            direction={"row"}
            gap={"small"}
            align={"center"}
            round
            pad={"small"}
            background={shared ? "light-4" : "light-0"}
          >
            <ShareOption size="large" />
            {shared ? (
              <Text size={"large"} weight={500}>
                Shared
              </Text>
            ) : (
              <Text size={"large"} weight={500}>
                Share
              </Text>
            )}
          </Box>
          {/* <Button onClick={testClicked} label={"TEST"} /> */}
        </Box>
      </Box>
    </SnappyVerticalScrollChild>
  );
}

export function UserFeed({ data }) {
  const { data: studyPhaseResult, trigger } = useApi(config.checkAndUpdate);
  const { data: studyPhase } = useApi(config.get, true);
  let navigate = useNavigate();

  useEffect(() => {
    if (studyPhaseResult && studyPhaseResult.msg === "done") {
      console.log({ HERE: studyPhaseResult });
      navigate(0);
    }
  }, [studyPhaseResult]);

  useEffect(() => {
    console.log({ studyPhase });
  }, [studyPhase]);

  return (
    <SnappyVerticalScrollContainer>
      {data && data.type === "POSTS" && data.posts ? (
        data.posts.map((item, ix) => {
          return <FeedItem key={ix} ix={ix} item={item} />;
        })
      ) : (
        <Text color={"status-error"}>Could not find any posts</Text>
      )}
      <SnappyVerticalScrollChild>
        <Section>
          {(studyPhase && studyPhase.stage === "TEST_DAY_01") ||
          (studyPhase && studyPhase.stage === "TEST_DAY_02") ? (
            <Box gap={"medium"}>
              <Text size="large">
                You have finished viewing your posts for the day. Please visit
                this app again tomorrow for new posts.
              </Text>
            </Box>
          ) : null}
          {studyPhase && studyPhase.stage === "TEST_DAY_03" ? (
            <Box gap={"medium"}>
              <Text size="large">
                You have finished viewing your posts for the day.
              </Text>
              <Button
                alignSelf="start"
                onClick={async () => {
                  await trigger();
                }}
                label={"Continue to Feedback Form"}
              ></Button>
            </Box>
          ) : null}
        </Section>
      </SnappyVerticalScrollChild>
    </SnappyVerticalScrollContainer>
  );
}
