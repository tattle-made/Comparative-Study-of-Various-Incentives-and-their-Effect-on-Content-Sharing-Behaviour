import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Text } from "grommet";
import { User } from "grommet-icons";
import { Section } from "~/components/atoms/Section";
import { UserContext } from "~/components/atoms/context";
import { useApi } from "~/api/hook";
import { config } from "~/api/feed/request";
import { UserFeed } from "~/components/molecules/FeedItem";

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
          <UserFeed data={data} />
        </Box>
      ) : null}
    </Box>
  );
}
