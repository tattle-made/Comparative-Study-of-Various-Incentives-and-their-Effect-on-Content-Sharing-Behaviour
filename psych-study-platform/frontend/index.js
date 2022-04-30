import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { Grommet } from "grommet";
import Theme from "~/components/atoms/Theme";
import { BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";

const app = document.getElementById("app");
const root = createRoot(app);
root.render(
  <RecoilRoot>
    <Grommet full theme={Theme}>
      <BrowserRouter>
        <Home tab="home" />
      </BrowserRouter>
    </Grommet>
  </RecoilRoot>
);
