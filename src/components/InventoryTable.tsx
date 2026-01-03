import { useMemo, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, GridReadyEvent, RowClickedEvent, GridApi } from 'ag-grid-community';
import { Box, Chip } from '@mui/material';
import { type InventoryItem, inventoryItems } from '../data/mockData';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface InventoryTableProps {
  category: 'Live Goods' | 'Materials' | 'Availability';
  searchQuery: string;
  onRowClick: (item: InventoryItem) => void;
  selectedItemId: string | null;
}

export interface InventoryTableRef {
  autoSizeColumns: () => void;
  expandAll: () => void;
  collapseAll: () => void;
  exportCsv: () => void;
}

const StatusCellRenderer = (props: { value: string }) => {
  const isReady = props.value === 'Ready';
  return (
    <Chip
      label={props.value}
      size="small"
      sx={{
        fontSize: '0.7rem',
        height: 22,
        backgroundColor: isReady ? '#D1FAE5' : '#FEF3C7',
        color: isReady ? '#065F46' : '#92400E',
      }}
    />
  );
};

const GradeCellRenderer = (props: { value: number }) => {
  return (
    <Chip
      label={props.value}
      size="small"
      sx={{
        fontSize: '0.7rem',
        height: 22,
        minWidth: 24,
        backgroundColor: '#E5E7EB',
        color: '#374151',
      }}
    />
  );
};

const NumberCellRenderer = (props: { value: number }) => {
  return <span>{props.value?.toLocaleString() || '—'}</span>;
};

const InventoryTable = forwardRef<InventoryTableRef, InventoryTableProps>(
  ({ category, searchQuery, onRowClick, selectedItemId }, ref) => {
    const gridRef = useRef<AgGridReact>(null);
    const gridApiRef = useRef<GridApi | null>(null);

    const filteredData = useMemo(() => {
      let data = inventoryItems.filter((item) => {
        // Filter by category
        if (category !== 'Availability' && item.category !== category) return false;

        // Filter by search
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            item.sku.toLowerCase().includes(query) ||
            item.itemName.toLowerCase().includes(query)
          );
        }
        return true;
      });

      // Only show parent items (non-child rows) for the main view
      // Child items will be shown via row grouping
      return data.filter((item) => !item.parentId);
    }, [category, searchQuery]);

    const columnDefs = useMemo(
      (): ColDef<InventoryItem>[] => [
        {
          field: 'itemName',
          headerName: 'SKU / Item Name',
          flex: 2,
          minWidth: 200,
          cellRenderer: (params: { data: InventoryItem }) => (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 500 }}>{params.data?.itemName}</span>
              <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>{params.data?.sku}</span>
            </Box>
          ),
          filter: true,
          sortable: true,
        },
        {
          field: 'location',
          headerName: 'Location',
          flex: 1.5,
          minWidth: 150,
          filter: true,
          sortable: true,
        },
        {
          field: 'onHand',
          headerName: 'On Hand',
          flex: 0.8,
          minWidth: 90,
          cellRenderer: NumberCellRenderer,
          filter: 'agNumberColumnFilter',
          sortable: true,
          type: 'numericColumn',
        },
        {
          field: 'available',
          headerName: 'Available',
          flex: 0.8,
          minWidth: 90,
          cellRenderer: (props: { value: number }) => (
            <span style={{ color: '#10B981', fontWeight: 500 }}>{props.value?.toLocaleString() || '—'}</span>
          ),
          filter: 'agNumberColumnFilter',
          sortable: true,
          type: 'numericColumn',
        },
        {
          field: 'allocated',
          headerName: 'Allocated',
          flex: 0.8,
          minWidth: 90,
          cellRenderer: (props: { value: number }) => (
            <span style={{ color: '#F59E0B' }}>{props.value?.toLocaleString() || '—'}</span>
          ),
          filter: 'agNumberColumnFilter',
          sortable: true,
          type: 'numericColumn',
        },
        {
          field: 'reserves',
          headerName: 'Reserves',
          flex: 0.8,
          minWidth: 90,
          cellRenderer: NumberCellRenderer,
          filter: 'agNumberColumnFilter',
          sortable: true,
          type: 'numericColumn',
        },
        {
          field: 'onTransfer',
          headerName: 'On Transfer',
          flex: 0.8,
          minWidth: 100,
          cellRenderer: (params: { value: number }) => (
            <span>{params.value > 0 ? params.value.toLocaleString() : '—'}</span>
          ),
          filter: 'agNumberColumnFilter',
          sortable: true,
          type: 'numericColumn',
        },
        {
          field: 'grade',
          headerName: 'Grade',
          flex: 0.6,
          minWidth: 70,
          cellRenderer: GradeCellRenderer,
          filter: true,
          sortable: true,
        },
        {
          field: 'status',
          headerName: 'Status',
          flex: 0.8,
          minWidth: 90,
          cellRenderer: StatusCellRenderer,
          filter: true,
          sortable: true,
        },
      ],
      []
    );

    const defaultColDef = useMemo<ColDef>(
      () => ({
        resizable: true,
        sortable: true,
      }),
      []
    );

    const onGridReady = useCallback((params: GridReadyEvent) => {
      gridApiRef.current = params.api;
    }, []);

    const handleRowClicked = useCallback(
      (event: RowClickedEvent<InventoryItem>) => {
        if (event.data) {
          onRowClick(event.data);
        }
      },
      [onRowClick]
    );

    const getRowStyle = useCallback(
      (params: { data?: InventoryItem }) => {
        if (params.data?.id === selectedItemId) {
          return { backgroundColor: '#FEF2F2' };
        }
        return undefined;
      },
      [selectedItemId]
    );

    useImperativeHandle(ref, () => ({
      autoSizeColumns: () => {
        gridApiRef.current?.autoSizeAllColumns();
      },
      expandAll: () => {
        gridApiRef.current?.expandAll();
      },
      collapseAll: () => {
        gridApiRef.current?.collapseAll();
      },
      exportCsv: () => {
        gridApiRef.current?.exportDataAsCsv({
          fileName: `inventory-${category.toLowerCase().replace(' ', '-')}.csv`,
        });
      },
    }));

    return (
      <Box
        className="ag-theme-alpine"
        sx={{
          height: '100%',
          width: '100%',
          '& .ag-header': {
            backgroundColor: '#F9FAFB',
          },
          '& .ag-header-cell-text': {
            fontWeight: 600,
            fontSize: '0.75rem',
            color: '#374151',
          },
          '& .ag-row': {
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#F9FAFB !important',
            },
          },
          '& .ag-cell': {
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.875rem',
          },
        }}
      >
        <AgGridReact<InventoryItem>
          ref={gridRef}
          rowData={filteredData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onRowClicked={handleRowClicked}
          getRowStyle={getRowStyle}
          rowSelection="single"
          animateRows={true}
          pagination={false}
          domLayout="normal"
          suppressCellFocus={true}
          rowHeight={52}
          headerHeight={40}
        />
      </Box>
    );
  }
);

InventoryTable.displayName = 'InventoryTable';

export default InventoryTable;
