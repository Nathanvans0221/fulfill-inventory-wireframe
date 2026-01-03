import { Box, Typography, Avatar, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudIcon from '@mui/icons-material/Cloud';

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 1,
        borderBottom: '1px solid #E5E7EB',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            backgroundColor: '#BA3636',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1rem' }}>F</Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '1.25rem',
            color: '#BA3636',
            letterSpacing: '0.05em',
          }}
        >
          FULFILL
        </Typography>
      </Box>

      {/* Right side */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Weather */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#6B7280' }}>
          <CloudIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2">72°F Rain</Typography>
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            Thu
          </Typography>
        </Box>

        {/* Notifications */}
        <IconButton size="small">
          <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10 } }}>
            <NotificationsIcon sx={{ fontSize: 20, color: '#6B7280' }} />
          </Badge>
        </IconButton>

        {/* Settings */}
        <IconButton size="small">
          <SettingsIcon sx={{ fontSize: 20, color: '#6B7280' }} />
        </IconButton>

        {/* User */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundColor: '#BA3636',
              fontSize: '0.875rem',
            }}
          >
            JD
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.2 }}>
              John Doe
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.7rem', lineHeight: 1 }}>
              Farm Manager
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
