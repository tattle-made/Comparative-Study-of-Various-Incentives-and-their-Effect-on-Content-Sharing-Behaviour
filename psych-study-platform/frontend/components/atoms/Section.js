import { Box } from "grommet";

export function Section({ children }) {
  return (
    <Box flex={"grow"} pad={"medium"}>
      {children}
    </Box>
  );
}
