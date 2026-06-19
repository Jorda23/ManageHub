'use client';

import { Box, Typography } from '@mui/material';
import {
  Dashboard,
  HomeWork,
  ReceiptLong,
  Inventory2,
  Groups,
} from '@mui/icons-material';
import Link from 'next/link';

const items = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: '/',
    icon: Dashboard,
  },
  {
    key: 'property',
    label: 'Property',
    href: '/',
    icon: HomeWork,
  },
  {
    key: 'activity',
    label: 'Activity',
    href: '/activity',
    icon: ReceiptLong,
  },
  {
    key: 'inventory',
    label: 'Inventory',
    href: '/',
    icon: Inventory2,
  },
  {
    key: 'crm',
    label: 'CRM',
    href: '/crm',
    icon: Groups,
  },
] as const;

type BottomNavProps = {
  active: string;
};

export default function BottomNav({ active }: BottomNavProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: '#031c1e',
        borderTop: '1px solid rgba(255,255,255,0.16)',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 20,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 420,
          display: 'grid',
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
          px: 0.5,
          py: 0.7,
        }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const selected = active === item.key;

          return (
            <Box
              key={item.key}
              component={Link}
              href={item.href}
              sx={{
                textDecoration: 'none',
                color: selected ? '#001f21' : 'text.secondary',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.3,
              }}
            >
              <Box
                sx={{
                  width: selected ? 56 : 34,
                  height: 34,
                  borderRadius: 99,
                  bgcolor: selected ? 'secondary.main' : 'transparent',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Icon fontSize="small" />
              </Box>

              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: selected ? 800 : 500,
                  color: selected ? 'secondary.main' : 'text.secondary',
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}