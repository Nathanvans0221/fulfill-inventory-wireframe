import { Box, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Typography, Divider } from '@mui/material';
import { useState } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SyncIcon from '@mui/icons-material/Sync';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  children?: { label: string; active?: boolean }[];
}

const navItems: NavItem[] = [
  { label: 'Customers', icon: <PeopleIcon /> },
  { label: 'EDI', icon: <SyncAltIcon /> },
  { label: 'Pricing', icon: <AttachMoneyIcon /> },
  {
    label: 'Product',
    icon: <InventoryIcon />,
    children: [
      { label: 'Items' },
      { label: 'Categories' },
      { label: 'Availability' },
    ],
  },
  { label: 'Inventory', icon: <Inventory2Icon />, active: true },
  { label: 'Orders', icon: <ShoppingCartIcon /> },
  { label: 'Sync', icon: <SyncIcon /> },
  { label: 'Logistics', icon: <LocalShippingIcon /> },
  { label: 'Settings', icon: <SettingsIcon /> },
];

export default function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>(['Product']);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <Box
      sx={{
        width: 200,
        minWidth: 200,
        backgroundColor: '#1F2937',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <List sx={{ py: 1, flexGrow: 1 }}>
        {navItems.map((item) => (
          <Box key={item.label}>
            <ListItemButton
              onClick={() => item.children && toggleExpand(item.label)}
              sx={{
                py: 1,
                px: 2,
                backgroundColor: item.active ? '#374151' : 'transparent',
                borderLeft: item.active ? '3px solid #BA3636' : '3px solid transparent',
                '&:hover': {
                  backgroundColor: '#374151',
                },
              }}
            >
              <ListItemIcon sx={{ color: item.active ? '#FFFFFF' : '#9CA3AF', minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: item.active ? 500 : 400,
                }}
              />
              {item.children &&
                (expandedItems.includes(item.label) ? (
                  <ExpandLessIcon sx={{ fontSize: 18, color: '#9CA3AF' }} />
                ) : (
                  <ExpandMoreIcon sx={{ fontSize: 18, color: '#9CA3AF' }} />
                ))}
            </ListItemButton>
            {item.children && (
              <Collapse in={expandedItems.includes(item.label)}>
                <List disablePadding>
                  {item.children.map((child) => (
                    <ListItemButton
                      key={child.label}
                      sx={{
                        py: 0.75,
                        pl: 6,
                        '&:hover': {
                          backgroundColor: '#374151',
                        },
                      }}
                    >
                      <ListItemText
                        primary={child.label}
                        primaryTypographyProps={{
                          fontSize: '0.8rem',
                          color: '#9CA3AF',
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>

      <Divider sx={{ borderColor: '#374151' }} />

      {/* Support Center */}
      <ListItemButton sx={{ py: 1, px: 2 }}>
        <ListItemIcon sx={{ color: '#9CA3AF', minWidth: 36 }}>
          <SupportAgentIcon />
        </ListItemIcon>
        <ListItemText
          primary="Support Center"
          primaryTypographyProps={{ fontSize: '0.875rem' }}
        />
      </ListItemButton>

      {/* Version */}
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.7rem' }}>
          VERIFY™
        </Typography>
      </Box>
    </Box>
  );
}
