'use client';

import { Box, AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import { FaBriefcase, FaRegBell } from 'react-icons/fa';
import BottomNav from '@/components/BottomNav/BottomNav';

type AppShellProps = {
  children: React.ReactNode;
  active: 'dashboard' | 'property' | 'activity' | 'inventory' | 'crm';
};

export default function AppShell({ children, active }: AppShellProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        pb: 8,
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: '#052f31',
          borderBottom: '1px solid rgba(255,255,255,0.14)',
        }}
      >
        <Toolbar
          sx={{
            minHeight: 52,
            px: {
              xs: 2,
              md: 5,
            },
          }}
        >
          <Box
            sx={{
              color: 'primary.main',
              mr: 1.2,
              display: 'flex',
              fontSize: 18,
            }}
          >
            <FaBriefcase />
          </Box>

          <Typography
            sx={{
              flex: 1,
              fontSize: 18,
              fontWeight: 900,
            }}
          >
            Enterprise Hub
          </Typography>

          <IconButton color="inherit">
            <FaRegBell size={16} />
          </IconButton>

          <Avatar
            sx={{
              width: 30,
              height: 30,
              ml: 1,
              bgcolor: 'primary.main',
              color: '#002527',
              fontSize: 14,
              fontWeight: 900,
            }}
          >
            B
          </Avatar>
        </Toolbar>
      </AppBar>

      <Box component="main">{children}</Box>

      <BottomNav active={active} />
    </Box>
  );
}