import { createRoot } from "react-dom/client";
import { Home } from "./pages/Home";

const app = document.getElementById("app");
const root = createRoot(app);
root.render(<Home tab="home" />);
