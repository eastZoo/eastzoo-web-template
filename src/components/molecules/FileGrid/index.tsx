import { useRef, useMemo, useCallback } from "react";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";
import type {
  ColDef,
  GridReadyEvent,
  RowSelectionOptions,
} from "ag-grid-community";
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  RowSelectionModule,
  CheckboxEditorModule,
} from "ag-grid-community";

/** 앱 엔트리(main.tsx)에서 ag-grid.css + ag-theme-quartz.css를 로드합니다. */
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  RowSelectionModule,
  CheckboxEditorModule,
]);

export interface FileGridProps<TData = unknown> {
  rowData: TData[];
  columnDefs: ColDef<TData>[];
  /** 셀 렌더러 등에 전달할 ag-grid context */
  context?: unknown;
  defaultColDef?: ColDef<TData>;
  rowHeight?: number;
  headerHeight?: number;
  /** ag-grid v35+ 방식: "multiRow" | "singleRow" */
  selectionMode?: "multiRow" | "singleRow";
  domLayout?: "normal" | "autoHeight" | "print";
  /** 기본: Quartz (main.tsx와 동일). Alpine 등 다른 테마 쓰면 해당 CSS를 로드하고 클래스명을 넘기세요. */
  className?: string;
  onGridReady?: (event: GridReadyEvent<TData>) => void;
}

/**
 * ag-grid 기반 재사용 데이터 그리드
 * 컬럼·context·행 데이터는 사용처에서 props로 전달합니다.
 */
export const FileGrid = <TData,>({
  rowData,
  columnDefs,
  context,
  defaultColDef: defaultColDefProp,
  rowHeight = 40,
  headerHeight = 40,
  selectionMode = "multiRow",
  domLayout = "autoHeight",
  className = "ag-theme-quartz",
  onGridReady,
}: FileGridProps<TData>) => {
  const gridRef = useRef<AgGridReact<TData>>(null);

  const defaultColDef = useMemo<ColDef<TData>>(
    () =>
      defaultColDefProp ?? {
        resizable: false,
        suppressHeaderMenuButton: true,
      },
    [defaultColDefProp]
  );

  /** ag-grid v35+ rowSelection 설정 */
  const rowSelection = useMemo<RowSelectionOptions>(
    () => ({
      mode: selectionMode,
      checkboxes: true,
      headerCheckbox: true,
      enableClickSelection: false,
    }),
    [selectionMode]
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<TData>) => {
      onGridReady?.(event);
    },
    [onGridReady]
  );

  return (
    <GridWrapper className={className}>
      <AgGridReact<TData>
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        context={context}
        rowHeight={rowHeight}
        headerHeight={headerHeight}
        rowSelection={rowSelection}
        onGridReady={handleGridReady}
        domLayout={domLayout}
      />
    </GridWrapper>
  );
};

export default FileGrid;

/** Figma 91-2963 계열: 화이트 테이블, Pretendard, 연한 구분선 (Quartz 변수 오버라이드) */
const GridWrapper = styled.div`
  width: 100%;

  &.ag-theme-quartz {
    /* ===== 기본 테마 변수 (Figma 디자인 기반) ===== */
    --ag-font-family: "Pretendard Variable", "Pretendard", sans-serif;
    --ag-font-size: 12px;
    --ag-background-color: #ffffff;
    --ag-foreground-color: rgba(46, 47, 51, 0.88);

    /* 헤더 스타일 - Figma: IsGridHeader */
    --ag-header-foreground-color: rgba(46, 47, 51, 0.88);
    --ag-header-background-color: #f7f7f8;
    --ag-header-height: 40px;
    --ag-header-column-resize-handle-color: rgba(112, 115, 124, 0.22);

    /* 행/셀 스타일 */
    --ag-odd-row-background-color: #ffffff;
    --ag-border-color: rgba(112, 115, 124, 0.08);
    --ag-secondary-border-color: rgba(112, 115, 124, 0.08);
    --ag-row-border-color: rgba(112, 115, 124, 0.08);
    --ag-row-hover-color: rgba(112, 115, 124, 0.05);
    --ag-selected-row-background-color: rgba(112, 115, 124, 0.05);
    --ag-cell-horizontal-padding: 12px;

    /* 체크박스 스타일 */
    --ag-active-color: #0066ff;
    --ag-checkbox-checked-color: #0066ff;
    --ag-checkbox-unchecked-color: rgba(112, 115, 124, 0.22);
    --ag-checkbox-indeterminate-color: #0066ff;
    --ag-checkbox-border-radius: 4px;

    /* ===== 루트 래퍼 ===== */
    .ag-root-wrapper {
      border: none;
      border-radius: 0;
    }

    /* ===== 헤더 영역 (Figma: IsGridHeader) ===== */
    .ag-header {
      border-top: 1px solid rgba(112, 115, 124, 0.08);
      border-bottom: 1px solid rgba(112, 115, 124, 0.08);
    }

    .ag-header-row {
      font-weight: 600;
      font-size: 12px;
      line-height: 1.334;
      letter-spacing: 0.3024px;
    }

    .ag-header-cell {
      padding: 0 12px;
      font-weight: 600;
      font-size: 12px;
    }

    .ag-header-cell-label {
      justify-content: center;
    }

    .ag-header-cell-text {
      font-weight: 600;
      color: rgba(46, 47, 51, 0.88);
    }

    /* 헤더 정렬 아이콘 */
    .ag-sort-indicator-icon {
      color: rgba(46, 47, 51, 0.88);
    }

    /* ===== 셀 영역 (Figma: IsGridCell) ===== */
    .ag-cell {
      display: flex;
      align-items: center;
      padding: 0 12px;
      font-weight: 500;
      font-size: 12px;
      line-height: 1.334;
      letter-spacing: 0.3024px;
      color: rgba(46, 47, 51, 0.88);
      border-bottom: 1px solid rgba(112, 115, 124, 0.08);
    }

    .ag-row {
      border-bottom: none;
      background-color: #ffffff;
    }

    .ag-row-hover {
      background-color: rgba(112, 115, 124, 0.05);
    }

    .ag-row-selected {
      background-color: rgba(112, 115, 124, 0.05);
    }

    /* ===== 체크박스 스타일 (ag-grid v35+) ===== */
    .ag-selection-checkbox {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ag-checkbox-input-wrapper {
      width: 16px;
      height: 16px;
    }

    .ag-checkbox-input-wrapper input {
      width: 16px;
      height: 16px;
    }

    .ag-checkbox-input-wrapper::after {
      border-radius: 4px;
      border-width: 1.5px;
    }

    /* 헤더 체크박스 */
    .ag-header-select-all {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* 체크박스 컬럼 패딩 조정 */
    .ag-header-cell[col-id="ag-Grid-SelectionColumn"],
    .ag-cell[col-id="ag-Grid-SelectionColumn"] {
      padding: 0 12px;
    }

    /* 체크박스 셀 정렬 */
    .ag-cell-wrapper.ag-row-group {
      align-items: center;
    }

    /* 셀 내 체크박스와 콘텐츠 정렬 */
    .ag-cell-value {
      display: flex;
      align-items: center;
    }

    /* ===== 링크 스타일 텍스트 (Figma: #1b2a6b) ===== */
    .ag-cell a,
    .ag-cell .link-text {
      color: #1b2a6b;
      text-decoration: none;
    }

    .ag-cell a:hover,
    .ag-cell .link-text:hover {
      text-decoration: underline;
    }

    /* ===== 첫 번째 컬럼 (이름) 왼쪽 정렬 ===== */
    .ag-cell[col-id="name"] {
      justify-content: flex-start;
      padding: 0 16px;
    }

    .ag-header-cell[col-id="name"] .ag-header-cell-label {
      justify-content: flex-start;
    }
  }
`;
