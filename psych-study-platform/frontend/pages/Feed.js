import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Heading, Text, Button, Paragraph, Button } from "grommet";
import { User, ShareOption } from "grommet-icons";
import styled from "styled-components";
import { Section } from "../atoms/Section";
import { UserContext } from "../context";
import { useApi } from "../api/hook";
import { config } from "../api/feed/request";
import { config as configEvent } from "../api/events/request";

const Container = styled.div`
  max-height: 80vh;
  overflow-y: scroll;
  scroll-snap-type: both mandatory;
`;

const Child = styled.div`
  height: 80vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  align-content: center;
`;

export function Feed() {
  let navigate = useNavigate();
  const location = useLocation();
  const [msg, setMsg] = useState("Default");
  const { user, setUser } = useContext(UserContext);
  const { data, err, loading, trigger } = useApi(config.getFeed, true);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  async function test() {
    await trigger();
  }

  return (
    <Box>
      {location.state.user.id ? (
        <Box>
          <Section>
            <Box round={"small"} border pad={"small"}>
              <Box direction={"row"} gap={"small"} align={"center"}>
                <User size={"large"} />
                <Text weight={800} size={"xxlarge"}>
                  {location.state.user.username}
                </Text>
              </Box>
            </Box>
            <Box flex={"grow"}></Box>
          </Section>
          {/* <Button label={"test"} onClick={test} /> */}
          <Container>
            {data && data.type === "POSTS" && data.posts
              ? data.posts.map((item, ix) => {
                  return <FeedItem key={ix} ix={ix} item={item} />;
                })
              : null}
          </Container>
        </Box>
      ) : null}
    </Box>
  );
}
function FeedItem({ ix, item }) {
  const [expand, setExpand] = useState(false);
  const [shared, setShared] = useState(false);
  const { data, err, loading, trigger } = useApi(configEvent.createEvent);

  async function clickShare() {
    setShared(!shared);
    await trigger({
      postId: item.id,
      name: "SHARE",
      value: shared ? "YES" : "NO",
    });
  }

  async function clickReaction(reaction) {
    await trigger({
      postId: item.id,
      name: "REACTION",
      value: reaction,
    });
  }

  async function clickReadMore() {
    setExpand(!expand);
    await trigger({
      postId: item.id,
      name: "READ_MORE",
      value: expand ? "NO" : "YES",
    });
  }

  return (
    <Child key={ix} ix={ix}>
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
    </Child>
  );
}
