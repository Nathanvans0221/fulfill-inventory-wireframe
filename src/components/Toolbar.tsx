import { Box, Button, IconButton, Divider, Badge, Menu, MenuItem, Tooltip } from '@mui/material';
import { useState } from 'react';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import TuneIcon from '@mui/icons-material/Tune';

interface ToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onAutoWidth: () => void;
  onExport: () => void;
  pendingChanges: number;
}

export default function Toolbar({ onZoomIn, onZoomOut, onAutoWidth, onExport, pendingChanges }: ToolbarProps) {
  const [availabilityAnchor, setAvailabilityAnchor] = useState<null | HTMLElement>(null);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 2,
        py: 1,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        flexWrap: 'wrap',
      }}
    >
      {/* Zoom Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Tooltip title="Zoom In">
          <IconButton size="small" onClick={onZoomIn}>
            <ZoomInIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom Out">
          <IconButton size="small" onClick={onZoomOut}>
            <ZoomOutIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      {/* Column Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Tooltip title="Auto Width">
          <Button
            size="small"
            startIcon={<ViewColumnIcon sx={{ fontSize: 16 }} />}
            onClick={onAutoWidth}
            sx={{ color: '#374151', fontSize: '0.75rem' }}
          >
            Auto Width
          </Button>
        </Tooltip>
        <Tooltip title="Freeze Column">
          <Button
            size="small"
            startIcon={<AcUnitIcon sx={{ fontSize: 16 }} />}
            sx={{ color: '#374151', fontSize: '0.75rem' }}
          >
            Freeze
          </Button>
        </Tooltip>
      </Box>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      {/* Import/Export */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Tooltip title="Export to CSV/Excel">
          <Button
            size="small"
            startIcon={<FileDownloadIcon sx={{ fontSize: 16 }} />}
            onClick={onExport}
            sx={{ color: '#374151', fontSize: '0.75rem' }}
          >
            Export
          </Button>
        </Tooltip>
        <Tooltip title="Import from file">
          <Button
            size="small"
            startIcon={<FileUploadIcon sx={{ fontSize: 16 }} />}
            sx={{ color: '#374151', fontSize: '0.75rem' }}
          >
            Import
          </Button>
        </Tooltip>
      </Box>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      {/* Save & Open */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Tooltip title="Save Layout">
          <Button
            size="small"
            startIcon={<SaveIcon sx={{ fontSize: 16 }} />}
            sx={{ color: '#374151', fontSize: '0.75rem' }}
          >
            Save
          </Button>
        </Tooltip>
        <Tooltip title="Open in New Tab">
          <Button
            size="small"
            startIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
            sx={{ color: '#374151', fontSize: '0.75rem' }}
          >
            Open
          </Button>
        </Tooltip>
      </Box>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      {/* Availability Dropdown */}
      <Button
        size="small"
        startIcon={<VisibilityIcon sx={{ fontSize: 16 }} />}
        onClick={(e) => setAvailabilityAnchor(e.currentTarget)}
        sx={{ color: '#374151', fontSize: '0.75rem' }}
      >
        Availability
      </Button>
      <Menu
        anchorEl={availabilityAnchor}
        open={Boolean(availabilityAnchor)}
        onClose={() => setAvailabilityAnchor(null)}
      >
        <MenuItem onClick={() => setAvailabilityAnchor(null)}>Show All</MenuItem>
        <MenuItem onClick={() => setAvailabilityAnchor(null)}>Available Only</MenuItem>
        <MenuItem onClick={() => setAvailabilityAnchor(null)}>Low Stock</MenuItem>
        <MenuItem onClick={() => setAvailabilityAnchor(null)}>Out of Stock</MenuItem>
      </Menu>

      {/* Inline Edits */}
      <Tooltip title="Enable Inline Editing">
        <Button
          size="small"
          startIcon={<EditIcon sx={{ fontSize: 16 }} />}
          sx={{ color: '#374151', fontSize: '0.75rem' }}
        >
          Inline Edits
        </Button>
      </Tooltip>

      {/* Parameters */}
      <Tooltip title="Parameters">
        <Button
          size="small"
          startIcon={<TuneIcon sx={{ fontSize: 16 }} />}
          sx={{ color: '#374151', fontSize: '0.75rem' }}
        >
          Parameters
        </Button>
      </Tooltip>

      <Box sx={{ flexGrow: 1 }} />

      {/* Right side actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Bulk Actions - shown when items selected */}
        <Button
          variant="outlined"
          size="small"
          sx={{
            fontSize: '0.75rem',
            borderColor: '#D1D5DB',
            color: '#374151',
          }}
        >
          Bulk Actions
        </Button>

        {/* Review Changes */}
        <Tooltip title="Review Pending Changes">
          <Badge
            badgeContent={pendingChanges}
            color="warning"
            sx={{ '& .MuiBadge-badge': { fontSize: 10 } }}
          >
            <Button
              size="small"
              startIcon={<RateReviewIcon sx={{ fontSize: 16 }} />}
              sx={{ color: '#374151', fontSize: '0.75rem' }}
            >
              Review Changes
            </Button>
          </Badge>
        </Tooltip>

        {/* Auto-Scrap */}
        <Tooltip title="Auto-scrap items >30 days unchanged">
          <Button
            size="small"
            startIcon={<DeleteSweepIcon sx={{ fontSize: 16 }} />}
            color="error"
            sx={{ fontSize: '0.75rem' }}
          >
            Auto-Scrap
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
