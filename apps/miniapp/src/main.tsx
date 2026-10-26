import "zmp-ui/zaui.css";
import "./styles/index.css";

import { createRoot } from "react-dom/client";
import { App } from "./app";
import { captureAttribution } from "./lib/attribution";

captureAttribution();

const root = document.getElementById("app");
if (!root) throw new Error("#app not found");
createRoot(root).render(<App />);
