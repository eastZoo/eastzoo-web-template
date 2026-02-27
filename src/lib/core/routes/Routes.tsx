import { Routes as DomRoutes, Route, Navigate } from "react-router-dom";
import { readAccessToken } from "@/lib/functions/authFunctions";
import { MainPage } from "@/pages/MainPage";
import HomePage from "@/pages/home/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "@/pages/404/NotFoundPage";
import SamplePage from "@/pages/sample/SamplePage";
import SamplePage1_1 from "@/pages/sample/sample1_1/SamplePage1_1";
import SamplePage1_2 from "@/pages/sample/sample1_2/SamplePage1_2";

interface RouterItem {
  path: string;
  element: React.ReactNode;
  withAuthorization: boolean;
  title?: string;
}

const routerItems: RouterItem[] = [
  /* 인증 */
  { path: "/auth/login", element: <LoginPage />, withAuthorization: false },

  /* 홈 */
  {
    path: "/",
    element: <HomePage />,
    withAuthorization: true,
    title: "대시보드",
  },

  /* 키 관리 */
  {
    path: "/sample",
    element: <SamplePage />,
    withAuthorization: true,
    title: "1.샘플 메뉴",
  },

  {
    path: "/sample/1-1",
    element: <SamplePage1_1 />,
    withAuthorization: true,
    title: "1-1.샘플페이지",
  },
  {
    path: "/sample/1-2",
    element: <SamplePage1_2 />,
    withAuthorization: true,
    title: "1-2.샘플페이지",
  },


  /* 404 */
  {
    path: "*",
    element: <NotFoundPage />,
    withAuthorization: true,
    title: "404 - 페이지 없음",
  },
];

export default function AppRoutes() {
  const accessToken = readAccessToken();
  return (
    <DomRoutes>
      <Route element={<MainPage />}>
        {routerItems
          .filter((route) => route.withAuthorization)
          .map((route: RouterItem) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <>
                    {route.title && <title>{route.title}</title>}
                    <PrivateRoute
                      component={route.element}
                      authenticated={accessToken}
                    />
                  </>
                }
              />
            );
          })}
      </Route>

      {routerItems
        .filter((route) => !route.withAuthorization)
        .map((route: RouterItem) => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        })}
    </DomRoutes>
  );
}
