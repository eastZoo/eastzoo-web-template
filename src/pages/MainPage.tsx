import { Outlet } from "react-router-dom";
import { MainTemplate } from "@/components/template/MainTemplate";

export function MainPage() {
  return (
    <MainTemplate>
      <Outlet />
    </MainTemplate>
  );
}
