import { createRoot } from "react-dom/client";
import { configureTokens } from "insystem-atoms";
import AppProviders from "./AppProviders.tsx";

// theme.ts에서 토큰 가져오기 (단일 소스)
import { insystemAtomsTokens } from "./styles/theme";

// insystem-atoms 디자인 토큰 커스터마이징 (theme.ts에서 정의한 토큰 사용)
configureTokens(insystemAtomsTokens);

createRoot(document.getElementById("root")!).render(
  <>
    <AppProviders />
  </>
);
