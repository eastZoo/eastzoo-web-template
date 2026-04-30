/**
 * useUserMenus.ts — 로그인 사용자 메뉴 조회 훅
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * GET /api/app/permission/menu-list 를 호출하여 sya_menu × sya_auth × sya_auth_dtl ×
 * sya_auth_menu 조인 결과(=현재 로그인 사용자에게 부여된 메뉴 목록)를 받아옵니다.
 *
 * 메뉴 트리 구성에 사용 (사이드바 등):
 *   1. 백엔드는 flat 한 UserMenuItem[] 을 반환합니다 (depth, upMenuCd 포함).
 *   2. 컴포넌트에서 buildMenuTree() 를 거쳐 트리로 변환해 렌더링합니다.
 *
 * 미인증(401) 또는 access token 부재 시에는 호출하지 않습니다 — Sidemenu 가
 * Login 후 마운트되더라도 enabled 옵션으로 안전하게 스킵 가능합니다.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useQuery } from "@tanstack/react-query";
import { request } from "@/lib/axios";
import { GET_USER_MENUS } from "@/lib/querykeys";
import { getQueryConfig } from "@/lib/constants/queryConfig";
import { isApiSuccess } from "@/types/api";
import type { ApiResponse } from "@/types/api";
import type { UserMenuItem } from "@/types/domain.types";
import { readAccessToken } from "@/lib/functions/authFunctions";

/**
 * 로그인 사용자가 접근 가능한 메뉴 목록을 조회합니다.
 *
 * @param options.enabled 외부에서 호출 여부를 제어하고 싶을 때 사용 (기본: 토큰 존재 여부로 자동 판단)
 */
export function useUserMenus(options?: { enabled?: boolean }) {
  const enabled = options?.enabled ?? Boolean(readAccessToken());

  return useQuery({
    queryKey: [GET_USER_MENUS],
    queryFn: async (): Promise<UserMenuItem[]> => {
      const res = await request<ApiResponse<UserMenuItem[]>>({
        method: "GET",
        url: "/api/permission/menu-list",
      });
      if (isApiSuccess(res)) return res.data ?? [];
      return [];
    },
    enabled,
    ...getQueryConfig("settings"),
  });
}
