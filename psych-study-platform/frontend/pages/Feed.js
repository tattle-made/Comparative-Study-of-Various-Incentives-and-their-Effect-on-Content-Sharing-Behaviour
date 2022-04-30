import { useState, useEffect, useContext } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "grommet";
import { User } from "grommet-icons";
import { Section } from "~/components/atoms/Section";
import { useApi } from "~/api/hook";
import { config } from "~/api/feed/request";
import { UserFeed } from "~/components/molecules/UserFeed";
import { UserState } from "~/UserState";

export function Feed() {
  let navigate = useNavigate();
  const [msg, setMsg] = useState("Default");
  const [user, setUser] = useRecoilState(UserState);
  const { data, err, loading, trigger } = useApi(config.getFeed, true);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  return (
    <Box>
      {user.id ? (
        <Box>
          <Section>
            <Box round={"small"} border pad={"small"}>
              <Box direction={"row"} gap={"small"} align={"center"}>
                <User size={"large"} />
                <Text weight={800} size={"xxlarge"}>
                  {user.username}
                </Text>
              </Box>
            </Box>
            <Box flex={"grow"}></Box>
          </Section>
          <UserFeed data={data} />
        </Box>
      ) : null}
    </Box>
  );
}