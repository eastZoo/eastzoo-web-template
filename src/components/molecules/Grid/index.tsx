import * as S from './Grid.style';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { forwardRef, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([AllCommunityModule]);

interface GridProps {
  height?: number | string;
  rowData: any[];
  isRadius?: boolean;
  rowHeight?: number;
  columnDefs: (ColDef | ColGroupDef)[];
  headerHeight?: number;
  rowSelection?: 'single' | 'multiple';
  groupHeaderHeight?: number;
  suppressCellFocus?: boolean;
  suppressRowClickSelection?: boolean;
  enableCellCopy?: boolean;
  onGridReady?: (e: any) => void;
  onCheckUser?: (e: any) => void;
  onRowClicked?: (event: any) => void;
  onCellClicked?: (event: any) => void;
}

const Grid = forwardRef<any, GridProps>(
  (
    {
      height = 400,
      rowData,
      isRadius = true,
      rowHeight = 48,
      columnDefs,
      rowSelection,
      headerHeight = 45,
      groupHeaderHeight = 60,
      suppressCellFocus = true,
      suppressRowClickSelection,
      enableCellCopy = false,
      onGridReady,
      onCheckUser,
      onRowClicked,
      onCellClicked,
    },
    ref,
  ) => {
    const [showToast, setShowToast] = useState(false);

    const handleCellClicked = (event: any) => {
      if (enableCellCopy && event.value) {
        navigator.clipboard.writeText(event.value);
        setShowToast(true);
      }
      onCellClicked?.(event);
    };

    return (
      <>
        <S.GridBox $isRadius={isRadius}>
          <S.GridWrapper $rowHeight={rowHeight} $headerHeight={headerHeight} $groupHeaderHeight={groupHeaderHeight}>
            <div className="ag-theme-quartz" style={{ height, width: '100%' }}>
              <AgGridReact
                ref={ref}
                rowData={rowData}
                columnDefs={columnDefs}
                rowHeight={rowHeight}
                headerHeight={headerHeight}
                groupHeaderHeight={groupHeaderHeight}
                rowSelection={rowSelection}
                suppressColumnVirtualisation={true}
                suppressAutoSize={true}
                onRowClicked={onRowClicked}
                onGridReady={onGridReady}
                onSelectionChanged={onCheckUser}
                onCellClicked={handleCellClicked}
                suppressCellFocus={suppressCellFocus}
                suppressRowClickSelection={suppressRowClickSelection}
              />
            </div>
          </S.GridWrapper>
        </S.GridBox>
       
      </>
    );
  },
);

Grid.displayName = 'Grid';

export default Grid;
