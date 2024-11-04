import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PopupApp from "./popupApp.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PopupApp />
  </StrictMode>
);
