import { createRoot } from "react-dom/client";
import AppProviders from "./AppProviders.tsx";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";


createRoot(document.getElementById("root")!).render(
  <>
    <AppProviders />
  </>
);
