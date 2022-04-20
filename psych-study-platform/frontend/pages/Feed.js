import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Box, Heading, Text, Button, Paragraph, Button } from "grommet";
import { User, ShareOption } from "grommet-icons";
import styled from "styled-components";
import { Section } from "../atoms/Section";

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

const feed = [
  {
    headline: "India's pricing of the 5G spectrum higher than other countries.",
    readMore:
      "The unit pricing of 5G in India is between 7 to 70 times costlier than other countries, raising concerns about its sunstainability and long term impacts on the telecom sector. ",
  },
  {
    headline:
      "Two speeds of sound were revealed in the first audio recording on Mars.",
    readMore:
      "Scientists discovered that Mars had two speeds of sound - one for high-pitched sounds and another for lower frequencies - after analyzing five hours of sound.",
  },
  {
    headline:
      "A famous left-leaning Indian journalist called ISRO Brahminical & anti-minority.",
    readMore:
      "A news anchor questioned the name of an ISRO lander, suggesting that the use of only Hindu names is Brahminical.",
  },
  {
    headline:
      "Indian women at a higher risk of death due to COVID-19 than men.",
    readMore:
      "Research has found that, in contrast to global trends, mortality due to COVID-19 is higher among Indian women than Indian men across three age groups.",
  },
  {
    headline: "The national capital is the most polluted city in India.",
    readMore:
      "A 2021 global report indicates that India's air quality has worsened with the national capital taking the biggest hit.",
  },
  {
    headline: "Scientists have created a fabric that can hear one's heartbeat.",
    readMore:
      "Scientists have developed a fabric that can pick up and convert sounds, including the heartbeat of a person, into electrical signals.",
  },
  {
    headline: "4G smartphone sales continue to overshadow 5G ones globally.",
    readMore:
      "As 5G technology and network are not available in most parts of the world, it has failed to gain momentum over sales of 4G smartphones.",
  },
  {
    headline: "Muslims protested against the repeal of Article 370 in Delhi.",
    readMore:
      "Muslims congregated on roads in the national capital to protest against the abrogation of Article 370 and safety warnings had to be issued for people to stay away. ",
  },
  {
    headline: "The black hole leaves an imprint in its gravitational field.",
    readMore:
      "The gravitational field of a black hole preserves the memory of what the stars which collapse into it were made of and thus demonstrate its ability to leave an imprint.",
  },
  {
    headline:
      "A climate change activist advocated for banning chopsticks to save trees.",
    readMore:
      "A young environmental activist asked the Chinese to ban chopsticks as they are made from bamboo and symbolize destruction of trees in the environment.",
  },
  {
    headline: "Laughter helps blood vessels function better.",
    readMore:
      "Doctors have found that laughter makes the tissues on the inner lining of blood vessels dilate or expand in order to increase blood flow, thereby linking laughter to healthy function of blood vessels.",
  },
  {
    headline: "Cracking one's knuckles frequently leads to arthritis.",
    readMore:
      "Evidence indicates that the energy released upon crackling knuckles can damage the cartilage, leading to arthritis in dire situations.",
  },
  {
    headline:
      "In India, prisoners under trial make up half of the total prison population.",
    readMore:
      "With the introduction of new bills, the country's legal and justice system have been able to process more accused individuals, thereby reducing the prisoners awaiting trial to about 50%.",
  },
  {
    headline:
      "The Ministry of Finance once equated decrease in inflation to decrease in prices.",
    readMore:
      "In 2017, on social media, the Ministry of Finance suggested that the falling rate of inflation and a decline in prices is the same, failing to recognize that a decreasing inflation does not mean a reduction in prices.",
  },
];

export function Feed() {
  const location = useLocation();
  const [msg, setMsg] = useState("Default");

  useEffect(() => {
    const getMsg = async () => {
      const response = await axios.get("http://localhost:3000");
      const { data } = response;
      setMsg(data);
    };

    // getMsg();
  }, []);

  useEffect(() => {
    console.log(location);
  }, []);

  return (
    <Box>
      {location.state.user ? (
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
          <Container>
            {feed.map((item, ix) => {
              return <FeedItem key={ix} ix={ix} item={item} />;
            })}
          </Container>
        </Box>
      ) : null}
    </Box>
  );
}
function FeedItem({ ix, item }) {
  const [expand, setExpand] = useState(false);
  return (
    <Child key={ix} ix={ix}>
      <Box margin={"medium"} pad={"medium"} border round gap={"medium"}>
        <Box>
          <Heading level={1}>{item.headline}</Heading>
          <Button
            plain
            label={"Read More"}
            onClick={() => setExpand(!expand)}
          />
          {expand ? (
            <Paragraph size="xxlarge">{item.readMore}</Paragraph>
          ) : null}
        </Box>
        <Box direction="row" gap={"large"}>
          <Box direction={"row"} gap={"small"}>
            <Box>
              <Button plain>
                <Text size={"40px"}>🙂</Text>
              </Button>
            </Box>
            <Box>
              <Button plain>
                <Text size={"40px"}>😠</Text>
              </Button>
            </Box>
            <Box>
              <Button plain>
                <Text size={"40px"}>🤢</Text>
              </Button>
            </Box>
          </Box>
          <Box>
            <ShareOption size="large" />
          </Box>
        </Box>
      </Box>
    </Child>
  );
}
