/**
 * 사용자 역할(Role) 더미 데이터
 * - 각 역할은 특정 메뉴에 대한 접근 권한을 정의
 * - 실제 구현시 API에서 로그인한 사용자의 역할 정보를 가져옴
 */

export type RoleType = "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "USER" | "GUEST";

export interface RolePermission {
  menuOid: string; // 메뉴 oid (menuListDummy의 oid와 매칭)
  canView: boolean; // 메뉴 표시 여부
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export interface Role {
  roleId: string;
  roleName: string;
  roleType: RoleType;
  description: string;
  permissions: RolePermission[];
}

/**
 * 역할별 권한 정의
 */
export const rolesDummy: Role[] = [
  {
    roleId: "role-super-admin",
    roleName: "최고관리자",
    roleType: "SUPER_ADMIN",
    description: "모든 메뉴 및 기능에 대한 전체 권한",
    permissions: [
      {
        menuOid: "menu-1-main",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-1-file-management",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-1-chat",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-1-sample",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-2-sample-info",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-2-sample-sample",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-3-sample-sub1",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-3-sample-sub2",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-1-component",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-2-atoms",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-2-molecules",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-1-settings",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-2-user-settings",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-2-system-settings",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
    ],
  },
  {
    roleId: "role-admin",
    roleName: "관리자",
    roleType: "ADMIN",
    description: "대부분의 메뉴 접근 가능, 시스템 설정 제외",
    permissions: [
      {
        menuOid: "menu-1-main",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-1-file-management",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-1-chat",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-1-sample",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-2-sample-info",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-2-sample-sample",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-3-sample-sub1",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-3-sample-sub2",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-1-component",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-2-atoms",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-2-molecules",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-1-settings",
        canView: true,
        canRead: true,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-2-user-settings",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: false,
      },
      {
        menuOid: "menu-2-system-settings",
        canView: false,
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
    ],
  },
  {
    roleId: "role-manager",
    roleName: "매니저",
    roleType: "MANAGER",
    description: "일반 업무 메뉴 접근 가능, 설정 메뉴 읽기 전용",
    permissions: [
      {
        menuOid: "menu-1-main",
        canView: true,
        canRead: true,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-1-file-management",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-1-chat",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-1-sample",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: false,
      },
      {
        menuOid: "menu-2-sample-info",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: false,
      },
      {
        menuOid: "menu-2-sample-sample",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: false,
      },
      {
        menuOid: "menu-3-sample-sub1",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: false,
      },
      {
        menuOid: "menu-3-sample-sub2",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: false,
      },
      {
        menuOid: "menu-1-component",
        canView: true,
        canRead: true,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-2-atoms",
        canView: true,
        canRead: true,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-2-molecules",
        canView: true,
        canRead: true,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-1-settings",
        canView: false,
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-2-user-settings",
        canView: false,
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-2-system-settings",
        canView: false,
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
    ],
  },
  {
    roleId: "role-user",
    roleName: "일반 사용자",
    roleType: "USER",
    description: "기본 메뉴만 접근 가능, 읽기 위주",
    permissions: [
      {
        menuOid: "menu-1-main",
        canView: true,
        canRead: true,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-1-file-management",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-1-chat",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-1-chat",
        canView: true,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        menuOid: "menu-1-sample",
        canView: true,
        canRead: true,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-2-sample-info",
        canView: true,
        canRead: true,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-2-sample-sample",
        canView: false,
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-3-sample-sub1",
        canView: false,
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-3-sample-sub2",
        canView: false,
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-1-component",
        canView: false,
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-2-atoms",
        canView: false,
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-2-molecules",
        canView: false,
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-1-settings",
        canView: false,
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-2-user-settings",
        canView: false,
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
      {
        menuOid: "menu-2-system-settings",
        canView: false,
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
      },
    ],
  },
];

/**
 * 현재 로그인한 사용자의 역할 (더미)
 * - 실제 구현시 로그인 API 응답에서 가져옴
 */
export const currentUserRole: Role = rolesDummy[3]; // SUPER_ADMIN으로 테스트

/**
 * 메뉴 oid로 권한 확인하는 헬퍼 함수
 */
export const getMenuPermission = (
  role: Role,
  menuOid: string
): RolePermission | undefined => {
  return role.permissions.find((p) => p.menuOid === menuOid);
};

/**
 * 메뉴가 현재 역할에서 보여야 하는지 확인
 */
export const canViewMenu = (role: Role, menuOid: string): boolean => {
  const permission = getMenuPermission(role, menuOid);
  return permission?.canView ?? false;
};
