'use client';

import { Box, AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import { FaBriefcase, FaRegBell } from 'react-icons/fa';

type AppShellProps = {
  children: React.ReactNode;
  active: 'dashboard' | 'property' | 'activity' | 'inventory' | 'crm';
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#00181a',
        color: 'text.primary',
        backgroundImage: `
          radial-gradient(circle at 0% 0%, rgba(25, 211, 216, 0.08), transparent 30%),
          radial-gradient(circle at 100% 0%, rgba(94, 227, 167, 0.05), transparent 24%)
        `,
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(5, 47, 49, 0.88)',
          borderBottom: '1px solid rgba(255,255,255,0.14)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <Toolbar
          sx={{
            minHeight: 56,
            px: {
              xs: 2,
              md: 5,
            },
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1.5,
              mr: 1.25,
              display: 'grid',
              placeItems: 'center',
              color: 'primary.main',
              bgcolor: 'rgba(25,211,216,0.1)',
              border: '1px solid rgba(25,211,216,0.16)',
              flexShrink: 0,
            }}
          >
            <FaBriefcase />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 950, lineHeight: 1 }}>
              Enterprise Hub
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 11, fontWeight: 700 }}>
              Operations suite
            </Typography>
          </Box>

          <IconButton color="inherit" aria-label="Notifications">
            <FaRegBell size={16} />
          </IconButton>

          <Avatar
            sx={{
              width: 32,
              height: 32,
              ml: 1,
              bgcolor: 'primary.main',
              color: '#002527',
              fontSize: 14,
              fontWeight: 900,
              border: '1px solid rgba(255,255,255,0.22)',
            }}
          >
            B
          </Avatar>
        </Toolbar>
      </AppBar>

      <Box component="main">{children}</Box>
    </Box>
  );
}
