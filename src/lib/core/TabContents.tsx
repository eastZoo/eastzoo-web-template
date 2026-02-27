import React, { lazy, Suspense } from "react";
import { useRecoilValue } from "recoil";
import type { Tab } from "@/types/menu";
import { openTabsState } from "@/store/menu";
import PrivateRoute from "./routes/PrivateRoute";
import useScreenList from "@/lib/hooks/useScreenList";

// Vite의 glob import를 사용하여 모든 페이지를 동적으로 로드
const pageModules = import.meta.glob<{ default: React.ComponentType<any> }>(
  "@/pages/**/*.tsx"
);

const TabContents = () => {
  const openTabs = useRecoilValue(openTabsState);
  const { data: screenList } = useScreenList();

  const componentMap = React.useMemo(() => {
    const map = new Map<string, React.LazyExoticComponent<any>>();
    for (const screen of screenList) {
      if (screen?.filePath) {
        // filePath를 Vite glob 경로 형식으로 변환
        const modulePath = `@/pages${screen.filePath}.tsx`;
        const moduleLoader = pageModules[modulePath];
        
        if (moduleLoader) {
          map.set(
            screen?.path || "",
            lazy(() => moduleLoader().then((mod) => ({ default: mod.default })))
          );
        }
      }
    }
    return map;
  }, [screenList]);

  // 탭이 없으면 아무것도 렌더링하지 않음
  if (!openTabs || openTabs.length === 0) {
    return null;
  }

  return (
    <>
      {openTabs.map((tab: Tab) => {
        const Component = componentMap.get(tab.path);
        if (!Component) return null;

        return (
          <PrivateRoute
            key={tab.id}
            component={
              <Suspense>
                <div
                  key={tab.id}
                  style={{
                    display: "block",
                    visibility: tab.isSelected ? "visible" : "hidden",
                    position: tab.isSelected ? "static" : "absolute",
                    left: tab.isSelected ? "0" : "-9999px",
                  }}
                >
                  <Component />
                </div>
              </Suspense>
            }
          />
        );
      })}
    </>
  );
};

export default TabContents;
