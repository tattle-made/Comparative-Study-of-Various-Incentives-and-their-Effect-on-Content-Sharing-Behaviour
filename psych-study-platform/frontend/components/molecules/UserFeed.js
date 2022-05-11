import { useState, useEffect } from "react";
import { config as configEvent } from "~/api/events/request";
import { EventValues, EventPayload } from "~/api/events/payload";
import { Box, Heading, Text, Button, Paragraph, Button } from "grommet";
import { ShareOption } from "grommet-icons";
import {
  SnappyVerticalScrollContainer,
  SnappyVerticalScrollChild,
} from "~/components/atoms/SnappyScroll";
import { useApi } from "~/api/hook";
import { config } from "~/api/study-phase/request";
import { config as configShare } from "~/api/share/request";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

/**
 *
 * `shared` is used to keep track of the share button's state.
 * Its possible values are - DEFAULT, IN_PROGRESS<
 */
function FeedItem({ ix, item }) {
  const [expand, setExpand] = useState(false);
  const [shared, setShared] = useState("DEFAULT");
  const { data, err, loading, trigger } = useApi(configEvent.createEvent);
  const {
    data: dataShare,
    err: shareErr,
    trigger: triggerShare,
  } = useApi(configShare.sharePost);
  const { ref, inView, entry } = useInView();

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
    setShared(false);
  }, [shareErr]);

  async function clickShare() {
    setShared(!shared);
    const { SHARE_YES, SHARE_NO } = EventPayload;
    await triggerShare({ postId: item.id, action: "SHARE" });
    await trigger(shared ? SHARE_YES(item.id) : SHARE_NO(item.id));
  }

  async function clickReaction(reaction) {
    let reactionPayload;
    if (reaction === EventValues.REACTION_HAPPY)
      reaction = EventPayload.REACTION_HAPPY;
    else if (reaction === EventValues.REACTION_ANGRY)
      reaction = EventPayload.REACTION_ANGRY;
    else if (reaction === EventValues.REACTION_DISGUST)
      reaction = EventPayload.REACTION_DISGUST;
    else throw new Error("Unexpected Reaction Value");

    await trigger(reactionPayload(item.id));
  }

  async function clickReadMore() {
    setExpand(!expand);
    const { READ_MORE_YES, READ_MORE_NO } = EventPayload;
    await trigger(expand ? READ_MORE_YES(item.id) : READ_MORE_NO(item.id));
  }

  return (
    <SnappyVerticalScrollChild key={ix} ix={ix} ref={ref}>
      <Box margin={"medium"} pad={"medium"} border round gap={"medium"}>
        <Box>
          <Heading level={1}>{item.headlineText}</Heading>
          <Button plain label={"Read More"} onClick={clickReadMore} />
          {expand ? (
            <Paragraph size="xxlarge">{item.readMoreText}</Paragraph>
          ) : null}
        </Box>
        <Box direction="row" gap={"large"}>
          <Box direction={"row"} gap={"small"}>
            <Box>
              <Button plain onClick={() => clickReaction("HAPPY")}>
                <Text size={"40px"}>🙂</Text>
              </Button>
            </Box>
            <Box>
              <Button plain onClick={() => clickReaction("ANGRY")}>
                <Text size={"40px"}>😠</Text>
              </Button>
            </Box>
            <Box>
              <Button plain onClick={() => clickReaction("DISGUST")}>
                <Text size={"40px"}>🤢</Text>
              </Button>
            </Box>
          </Box>
          <Box
            hoverIndicator={true}
            focusIndicator={false}
            onClick={clickShare}
            direction={"row"}
            gap={"small"}
            align={"center"}
          >
            <ShareOption size="large" />
            {shared ? (
              <Text size={"large"} weight={"500"}>
                Shared
              </Text>
            ) : null}
          </Box>
        </Box>
      </Box>
    </SnappyVerticalScrollChild>
  );
}

export function UserFeed({ data }) {
  const { data: studyPhaseResult, trigger } = useApi(config.checkAndUpdate);
  let navigate = useNavigate();

  useEffect(() => {
    if (studyPhaseResult && studyPhaseResult.msg === "done") {
      console.log({ HERE: studyPhaseResult });
      navigate(0);
    }
  }, [studyPhaseResult]);

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
        <Button
          onClick={async () => {
            await trigger();
          }}
          label={"Next"}
        ></Button>
      </SnappyVerticalScrollChild>
    </SnappyVerticalScrollContainer>
  );
}
