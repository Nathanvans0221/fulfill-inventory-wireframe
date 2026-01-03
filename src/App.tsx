import { useState, useRef, useCallback } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Box, Tabs, Tab, Button, TextField, InputAdornment, Typography, Slide } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import { fulfillTheme } from './theme';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import InventoryTable, { type InventoryTableRef } from './components/InventoryTable';
import SliderPanel from './components/SliderPanel';
import { type InventoryItem, inventoryItems } from './data/mockData';

type TabValue = 'Live Goods' | 'Materials' | 'Availability';

function App() {
  const [activeTab, setActiveTab] = useState<TabValue>('Live Goods');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [sliderOpen, setSliderOpen] = useState(false);
  const [lastUpdated] = useState(new Date());
  const tableRef = useRef<InventoryTableRef>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: TabValue) => {
    setActiveTab(newValue);
  };

  const handleRowClick = useCallback((item: InventoryItem) => {
    setSelectedItem(item);
    setSliderOpen(true);
  }, []);

  const handleCloseSlider = useCallback(() => {
    setSliderOpen(false);
  }, []);

  const handleZoomIn = () => {
    // In a real app, this would adjust row heights
    console.log('Zoom in');
  };

  const handleZoomOut = () => {
    // In a real app, this would adjust row heights
    console.log('Zoom out');
  };

  const handleAutoWidth = () => {
    tableRef.current?.autoSizeColumns();
  };

  const handleExport = () => {
    tableRef.current?.exportCsv();
  };

  const handleExpandAll = () => {
    tableRef.current?.expandAll();
  };

  const handleCollapseAll = () => {
    tableRef.current?.collapseAll();
  };

  // Calculate item counts for status display
  const itemCount = inventoryItems.filter(
    (item) => !item.parentId && (activeTab === 'Availability' || item.category === activeTab)
  ).length;
  const locationCount = inventoryItems.filter(
    (item) => item.parentId && (activeTab === 'Availability' || item.category === activeTab)
  ).length;

  return (
    <ThemeProvider theme={fulfillTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
          {/* Header */}
          <Header />

          {/* Page Content */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
            {/* Page Title */}
            <Box sx={{ px: 3, pt: 2, pb: 1 }}>
              <Typography variant="h1">Inventory</Typography>
            </Box>

            {/* Toolbar */}
            <Toolbar
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onAutoWidth={handleAutoWidth}
              onExport={handleExport}
              pendingChanges={1}
            />

            {/* Tabs and Controls */}
            <Box
              sx={{
                px: 2,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {/* View Tabs */}
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  sx={{
                    minHeight: 36,
                    '& .MuiTab-root': {
                      minHeight: 36,
                      py: 0.5,
                      px: 2,
                      fontSize: '0.875rem',
                    },
                    '& .Mui-selected': {
                      color: '#BA3636 !important',
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: '#BA3636',
                    },
                  }}
                >
                  <Tab label="Live Goods" value="Live Goods" />
                  <Tab label="Materials" value="Materials" />
                  <Tab label="Availability" value="Availability" />
                </Tabs>

                {/* Expand/Collapse */}
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Button
                    size="small"
                    startIcon={<UnfoldMoreIcon sx={{ fontSize: 16 }} />}
                    onClick={handleExpandAll}
                    sx={{ color: '#374151', fontSize: '0.75rem' }}
                  >
                    Expand All
                  </Button>
                  <Button
                    size="small"
                    startIcon={<UnfoldLessIcon sx={{ fontSize: 16 }} />}
                    onClick={handleCollapseAll}
                    sx={{ color: '#374151', fontSize: '0.75rem' }}
                  >
                    Collapse All
                  </Button>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {/* Search */}
                <TextField
                  size="small"
                  placeholder="Search by SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ fontSize: 18, color: '#9CA3AF' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: 200,
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.875rem',
                    },
                  }}
                />

                {/* Status */}
                <Typography variant="body2" sx={{ color: '#6B7280' }}>
                  Current Inventory ({itemCount} Items, {locationCount + itemCount} locations)
                </Typography>
              </Box>
            </Box>

            {/* Main Content Area */}
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden', minHeight: 0 }}>
              {/* Table */}
              <Box sx={{ flexGrow: 1, overflow: 'hidden', p: 2, display: 'flex', flexDirection: 'column' }}>
                <InventoryTable
                  ref={tableRef}
                  category={activeTab}
                  searchQuery={searchQuery}
                  onRowClick={handleRowClick}
                  selectedItemId={selectedItem?.id || null}
                />
              </Box>

              {/* Slider Panel */}
              <Slide direction="left" in={sliderOpen} mountOnEnter unmountOnExit>
                <Box>
                  <SliderPanel item={selectedItem} onClose={handleCloseSlider} />
                </Box>
              </Slide>
            </Box>

            {/* Footer */}
            <Box
              sx={{
                px: 3,
                py: 1,
                borderTop: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
              }}
            >
              <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.75rem' }}>
                Last updated: {lastUpdated.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}{' '}
                {lastUpdated.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
