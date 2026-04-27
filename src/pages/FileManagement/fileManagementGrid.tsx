import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import type { ColDef, ICellRendererParams, CellStyle } from "ag-grid-community";
import {
  FileIconSmall,
  FolderIconSmall,
  MoreVerticalIcon,
  EditIcon,
  MoveIcon,
  TrashIcon,
  StatusDot,
} from "@/styles/icons";

/** 파일 관리 그리드 행 타입 */
export interface FileItem {
  select?: boolean;
  id: string;
  name: string;
  type: "file" | "folder";
  modifiedDate: string;
  visibility: "private" | "team" | "public" | "pending";
  /** 전체 공개 승인 상태 */
  approvalStatus?: "none" | "pending" | "approved";
  vectorStatus: "complete" | "pending" | "none";
  size: string;
}

/** 액션 메뉴·이름 셀에서 사용하는 ag-grid context */
export interface FileManagementGridContext {
  onEdit?: (file: FileItem) => void;
  onMove?: (file: FileItem) => void;
  onDelete?: (file: FileItem) => void;
  /** 폴더 이름 클릭 시 상세로 이동 */
  onOpenFolder?: (file: FileItem) => void;
}

const cellStyleFlexCenter: CellStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cellStyleTextRight: CellStyle = {
  textAlign: "right",
};

const NameCellRenderer = (
  props: ICellRendererParams<FileItem, unknown, FileManagementGridContext>
) => {
  const data = props.data;
  const ctx = props.context;
  if (!data) return null;

  return (
    <NameCell>
      <IconWrapper>
        {data.type === "folder" ? <FolderIconSmall /> : <FileIconSmall />}
      </IconWrapper>
      {data.type === "folder" ? (
        <FolderNameButton
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            ctx?.onOpenFolder?.(data);
          }}
        >
          {data.name}
        </FolderNameButton>
      ) : (
        <FileNameText>{data.name}</FileNameText>
      )}
    </NameCell>
  );
};

const VisibilityBadgeRenderer = (
  props: ICellRendererParams<FileItem, unknown, FileManagementGridContext>
) => {
  const data = props.data;
  if (!data) return null;

  const badgeConfig: Record<
    string,
    { label: string; bg: string; color: string }
  > = {
    private: {
      label: "나만 보기",
      bg: "rgba(112, 115, 124, 0.12)",
      color: "rgba(55, 56, 60, 0.61)",
    },
    team: {
      label: "팀 공개",
      bg: "rgba(0, 189, 222, 0.12)",
      color: "#00BDDE",
    },
    public: {
      label: "전체공개",
      bg: "rgba(0, 191, 64, 0.12)",
      color: "#00BF40",
    },
    pending: {
      label: "승인요청",
      bg: "rgba(255, 146, 0, 0.12)",
      color: "#FF9200",
    },
  };

  const config = badgeConfig[data.visibility];
  if (!config) return <span>—</span>;

  return (
    <Badge $bg={config.bg} $color={config.color}>
      {config.label}
    </Badge>
  );
};

const VectorStatusRenderer = (
  props: ICellRendererParams<FileItem, unknown, FileManagementGridContext>
) => {
  const data = props.data;
  if (!data) return null;

  if (data.vectorStatus === "none") {
    return <span style={{ color: "rgba(55, 56, 60, 0.61)" }}>—</span>;
  }

  const statusConfig: Record<string, { label: string; color: string }> = {
    complete: { label: "완료", color: "#00BF40" },
    pending: { label: "대기중", color: "#FF9200" },
  };

  const config = statusConfig[data.vectorStatus];
  if (!config) return null;

  return (
    <StatusCell>
      <StatusDot color={config.color} />
      <StatusLabel>{config.label}</StatusLabel>
    </StatusCell>
  );
};

const ActionMenuRenderer = (
  props: ICellRendererParams<FileItem, unknown, FileManagementGridContext>
) => {
  const data = props.data;
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateMenuPosition = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 4,
        left: rect.right - 140, // menu min-width is 140px, align to right
      });
    }
  }, []);

  const handleToggleMenu = useCallback(() => {
    if (!showMenu) {
      updateMenuPosition();
    }
    setShowMenu(!showMenu);
  }, [showMenu, updateMenuPosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    const handleScroll = () => {
      if (showMenu) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [showMenu]);

  if (!data) return null;

  const handleEdit = () => {
    setShowMenu(false);
    props.context?.onEdit?.(data);
  };

  const handleMove = () => {
    setShowMenu(false);
    props.context?.onMove?.(data);
  };

  const handleDelete = () => {
    setShowMenu(false);
    props.context?.onDelete?.(data);
  };

  return (
    <ActionWrapper>
      <ActionButton
        ref={buttonRef}
        type="button"
        title="행 메뉴"
        aria-label="행 메뉴 열기"
        aria-expanded={showMenu}
        aria-haspopup="menu"
        onClick={handleToggleMenu}
      >
        <MoreVerticalIcon />
      </ActionButton>
      {showMenu &&
        createPortal(
          <ActionMenuPortal
            ref={menuRef}
            style={{ top: menuPosition.top, left: menuPosition.left }}
          >
            <GridMenuItem type="button" onClick={handleEdit}>
              <GridMenuIcon>
                <EditIcon />
              </GridMenuIcon>
              <GridMenuLabel>수정하기</GridMenuLabel>
            </GridMenuItem>
            <GridMenuDivider />
            <GridMenuItem type="button" onClick={handleMove}>
              <GridMenuIcon>
                <MoveIcon />
              </GridMenuIcon>
              <GridMenuLabel>이동하기</GridMenuLabel>
            </GridMenuItem>
            <GridMenuDivider />
            <GridMenuItem type="button" onClick={handleDelete}>
              <GridMenuIcon>
                <TrashIcon />
              </GridMenuIcon>
              <GridMenuLabel>삭제하기</GridMenuLabel>
            </GridMenuItem>
          </ActionMenuPortal>,
          document.body
        )}
    </ActionWrapper>
  );
};

/** 파일 관리 화면용 ag-grid 컬럼 정의 (정적이므로 useMemo deps 없이 한 번만 생성해도 됨) */
export function createFileManagementColumnDefs(): ColDef<FileItem>[] {
  return [
    {
      headerName: "이름",
      field: "name",
      flex: 1,
      minWidth: 200,
      cellRenderer: NameCellRenderer,
      sortable: true,
    },
    {
      headerName: "수정 날짜",
      field: "modifiedDate",
      width: 120,
      sortable: true,
    },
    {
      headerName: "공개 범위",
      field: "visibility",
      width: 120,
      cellRenderer: VisibilityBadgeRenderer,
      cellStyle: cellStyleFlexCenter,
      sortable: false,
    },
    {
      headerName: "벡터화 상태",
      field: "vectorStatus",
      width: 120,
      cellRenderer: VectorStatusRenderer,
      cellStyle: cellStyleFlexCenter,
      sortable: false,
    },
    {
      headerName: "크기",
      field: "size",
      width: 100,
      cellStyle: cellStyleTextRight,
      sortable: false,
    },
    {
      headerName: "관리",
      field: "id",
      width: 80,
      colId: "actions",
      cellRenderer: ActionMenuRenderer,
      cellStyle: cellStyleFlexCenter,
      sortable: false,
      lockPosition: "right",
    },
  ];
}

/** 컬럼 정의는 불변이라 한 번만 메모이제이션 */
export function useFileManagementColumnDefs(): ColDef<FileItem>[] {
  return useMemo(() => createFileManagementColumnDefs(), []);
}

const NameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #1b2a6b;
`;

const FileNameText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #1b2a6b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FolderNameButton = styled.button`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  color: #1b2a6b;

  &:hover {
    text-decoration: underline;
  }
`;

const Badge = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  background: ${({ $bg }) => $bg};
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ $color }) => $color};
  white-space: nowrap;
`;

const StatusCell = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StatusLabel = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: rgba(46, 47, 51, 0.88);
`;

const ActionWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 6px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: rgba(46, 47, 51, 0.88);
  transition: background 0.15s ease;

  &:hover {
    background: rgba(112, 115, 124, 0.08);
  }
`;

const ActionMenuPortal = styled.div`
  position: fixed;
  min-width: 140px;
  background: #ffffff;
  border: 1px solid #eaebec;
  border-radius: 8px;
  box-shadow:
    0px 4px 6px -1px rgba(23, 23, 23, 0.06),
    0px 2px 4px -2px rgba(23, 23, 23, 0.06);
  padding: 4px 0;
  z-index: 9999;
`;

const GridMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(23, 23, 25, 0.075);
  }
`;

const GridMenuIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: rgba(46, 47, 51, 0.88);
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const GridMenuLabel = styled.span`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.334;
  letter-spacing: 0.302px;
  color: rgba(46, 47, 51, 0.88);
`;

const GridMenuDivider = styled.div`
  height: 1px;
  margin: 0 8px;
  background: rgba(112, 115, 124, 0.08);
`;
