import styled from "styled-components";

const SnappyVerticalScrollContainer = styled.div`
  max-height: 80vh;
  overflow-y: scroll;
  scroll-snap-type: both mandatory;
`;

const SnappyVerticalScrollChild = styled.div`
  height: 80vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  align-content: center;
`;

export { SnappyVerticalScrollContainer, SnappyVerticalScrollChild };
