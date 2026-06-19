'use client';

import {
  Box,
  Button,
  Card,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import {
  Add,
  Search,
  Tune,
  FilterList,
  Groups,
  TrendingUp,
  Inventory,
} from '@mui/icons-material';
import AppShell from '@/components/AppShell/AppShell';

const contacts = [
  {
    initials: 'JD',
    name: 'James Dalton',
    email: 'j.dalton@enterprise.com',
    type: 'Customer',
  },
  {
    initials: 'AS',
    name: 'Apex Solutions',
    email: 'billing@apex-sol.io',
    type: 'Supplier',
  },
  {
    initials: 'ML',
    name: 'Maria Lopez',
    email: 'm.lopez@gmail.com',
    type: 'Customer',
  },
  {
    initials: 'FT',
    name: 'Flux Tools Ltd',
    email: 'contact@fluxtools.com',
    type: 'Supplier',
  },
];

export default function CrmPage() {
  return (
    <AppShell active="crm">
      <Stack spacing={2.3}>
        <Box>
          <Typography variant="h5" color="secondary.main">
            CRM
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 15, fontWeight: 600 }}>
            Unified directory for all customer and supplier relations.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Box
            sx={{
              flex: 1,
              height: 42,
              border: '1px solid rgba(255,255,255,0.22)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              px: 1.5,
              gap: 1,
              color: 'text.secondary',
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            <Search fontSize="small" />
            Search directory...
          </Box>

          <Button
            variant="contained"
            sx={{
              minWidth: 62,
              bgcolor: 'secondary.main',
              color: '#002527',
            }}
          >
            <Add />
          </Button>
        </Stack>

        <CardBox>
          <Typography sx={{ fontSize: 11, textTransform: 'uppercase', fontWeight: 900, mb: 2 }}>
            Directory Overview
          </Typography>

          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary">Total Customers</Typography>
            <Typography variant="h6">1,284</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography color="text.secondary">Active Suppliers</Typography>
            <Typography variant="h6">452</Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={74}
            sx={{
              mt: 2,
              height: 4,
              borderRadius: 99,
              bgcolor: 'rgba(255,255,255,0.12)',
              '& .MuiLinearProgress-bar': {
                bgcolor: 'secondary.main',
              },
            }}
          />

          <Chip
            label="74% Target Growth"
            sx={{
              mt: 1.5,
              bgcolor: 'rgba(94,227,167,0.15)',
              color: 'secondary.main',
              fontWeight: 800,
            }}
          />
        </CardBox>

        <CardBox sx={{ bgcolor: 'rgba(25,211,216,0.18)' }}>
          <Typography sx={{ fontSize: 11, textTransform: 'uppercase', fontWeight: 900 }}>
            Pending Actions
          </Typography>
          <Typography variant="h6" sx={{ mt: 0.8 }}>
            8 Verification Alerts
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: 'secondary.main',
              color: '#002527',
            }}
          >
            Resolve Now
          </Button>
        </CardBox>

        <CardBox sx={{ p: 0, overflow: 'hidden' }}>
          <Stack direction="row" justifyContent="space-between" sx={{ p: 2.2 }}>
            <Typography sx={{ fontSize: 11, textTransform: 'uppercase', fontWeight: 900 }}>
              Unified Directory
            </Typography>

            <Stack direction="row" spacing={1}>
              <FilterList />
              <Tune />
            </Stack>
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              borderTop: '1px solid rgba(255,255,255,0.16)',
              borderBottom: '1px solid rgba(255,255,255,0.16)',
              px: 2.2,
              py: 1.5,
            }}
          >
            <Typography sx={{ fontSize: 11, textTransform: 'uppercase', fontWeight: 900 }}>
              Contact Name
            </Typography>
            <Typography sx={{ fontSize: 11, textTransform: 'uppercase', fontWeight: 900 }}>
              Type
            </Typography>
          </Box>

          {contacts.map((contact) => (
            <Box
              key={contact.email}
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'center',
                px: 2.2,
                py: 1.4,
                borderBottom: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <Stack direction="row" spacing={1.3} alignItems="center">
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 99,
                    bgcolor: 'rgba(25,211,216,0.22)',
                    color: 'secondary.main',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 900,
                  }}
                >
                  {contact.initials}
                </Box>

                <Box>
                  <Typography sx={{ fontWeight: 900 }}>{contact.name}</Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
                    {contact.email}
                  </Typography>
                </Box>
              </Stack>

              <Chip
                label={contact.type}
                size="small"
                sx={{
                  bgcolor:
                    contact.type === 'Customer'
                      ? 'rgba(94,227,167,0.14)'
                      : 'rgba(25,211,216,0.14)',
                  color:
                    contact.type === 'Customer'
                      ? 'secondary.main'
                      : 'primary.main',
                  fontWeight: 800,
                }}
              />
            </Box>
          ))}
        </CardBox>

        <InsightCard
          icon={<Groups />}
          title="High Engagement"
          description="Grocery Customers have increased interaction frequency by 18% this month."
        />

        <InsightCard
          icon={<Inventory />}
          title="Fulfillment Status"
          description="Hardware Suppliers are maintaining a 98.4% on-time delivery rate."
        />

        <InsightCard
          icon={<TrendingUp />}
          title="Market Insight"
          description="Property leads are skewing towards commercial leases this quarter."
        />
      </Stack>
    </AppShell>
  );
}

function CardBox({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: object;
}) {
  return (
    <Card
      sx={{
        p: 2.2,
        bgcolor: 'rgba(0, 20, 22, 0.72)',
        border: '1px solid rgba(255,255,255,0.20)',
        boxShadow: 'none',
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}

function InsightCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <CardBox
      sx={{
        minHeight: 145,
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        bgcolor: 'rgba(0, 64, 68, 0.75)',
      }}
    >
      <Box sx={{ color: 'secondary.main', mb: 1 }}>{icon}</Box>

      <Typography sx={{ fontSize: 18, fontWeight: 900 }}>
        {title}
      </Typography>

      <Typography sx={{ color: 'text.secondary', fontSize: 13, maxWidth: 260 }}>
        {description}
      </Typography>
    </CardBox>
  );
}