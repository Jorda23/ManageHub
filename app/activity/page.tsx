'use client';

import {
  Box,
  Button,
  Card,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';

import {
  FaBuilding,
  FaTools,
  FaShoppingCart,
  FaMoneyBillWave,
  FaCreditCard,
  FaUniversity,
  FaReceipt,
  FaPrint,
  FaCheckCircle,
  FaPlusCircle,
  FaSearch,
  FaChartLine,
} from 'react-icons/fa';

import AppShell from '@/components/AppShell/AppShell';

const products = [
  {
    name: 'Organic Coffee Beans',
    detail: '(340g)',
    code: 'GRC-CF-2024',
    qty: 2,
    unit: '$18.50',
    total: '$37.00',
    image: '☕',
  },
  {
    name: 'Farm Fresh Milk',
    detail: '(1L)',
    code: 'GRC-MK-1011',
    qty: 4,
    unit: '$4.25',
    total: '$17.00',
    image: '🥛',
  },
];

export default function ActivityPage() {
  return (
    <AppShell active="activity">
      <Box
        sx={{
          width: '100%',
          minHeight: 'calc(100vh - 52px)',
          px: {
            xs: 2,
            md: 5,
          },
          py: {
            xs: 3,
            md: 4,
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{
                color: 'primary.main',
                fontSize: {
                  xs: 28,
                  md: 30,
                },
                fontWeight: 900,
                lineHeight: 1.1,
              }}
            >
              New Transaction
            </Typography>

            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: 16,
                fontWeight: 600,
                mt: 0.5,
              }}
            >
              Create a professional invoice and record payment in real-time.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                lg: '1fr 384px',
              },
              gap: 3,
              alignItems: 'start',
            }}
          >
            <Stack spacing={2.5}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    md: '1fr 1fr',
                  },
                  gap: 2.5,
                }}
              >
                <Section title="Business Category">
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 1,
                    }}
                  >
                    <CategoryButton icon={<FaBuilding />} label="Property" />
                    <CategoryButton icon={<FaTools />} label="Hardware" />
                    <CategoryButton active icon={<FaShoppingCart />} label="Grocery" />
                  </Box>
                </Section>

                <Section title="Customer Information">
                  <Box
                    sx={{
                      height: 42,
                      border: '1px solid rgba(255,255,255,0.18)',
                      borderRadius: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      px: 1.8,
                      color: 'text.primary',
                      fontSize: 16,
                      fontWeight: 700,
                      bgcolor: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    Search customer or add new...

                    <Box sx={{ color: 'rgba(255,255,255,0.35)', display: 'flex' }}>
                      <FaSearch />
                    </Box>
                  </Box>
                </Section>
              </Box>

              <Section
                title="Itemized List"
                action={
                  <Stack
                    direction="row"
                    spacing={0.6}
                    alignItems="center"
                    sx={{ color: 'primary.main', cursor: 'pointer' }}
                  >
                    <FaPlusCircle size={14} />
                    <Typography sx={{ fontSize: 16 }}>Add Item</Typography>
                  </Stack>
                }
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr 45px 80px 80px',
                      md: '1fr 80px 120px 90px',
                    },
                    alignItems: 'center',
                    color: 'text.secondary',
                    mb: 1,
                  }}
                >
                  <Typography sx={tableHeaderSx}>Description</Typography>
                  <Typography sx={tableHeaderSx}>Qty</Typography>
                  <Typography sx={tableHeaderSx}>Unit Price</Typography>
                  <Typography sx={tableHeaderSx}>Total</Typography>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.22)' }} />

                <Stack>
                  {products.map((product) => (
                    <Box
                      key={product.code}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                          xs: '1fr 45px 80px 80px',
                          md: '1fr 80px 120px 90px',
                        },
                        alignItems: 'center',
                        py: 2,
                        borderBottom: '1px solid rgba(255,255,255,0.07)',
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <ProductThumb>{product.image}</ProductThumb>

                        <Box>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 800,
                              color: 'text.primary',
                            }}
                          >
                            {product.name} {product.detail}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 11,
                              color: '#ff6a4d',
                              fontWeight: 700,
                            }}
                          >
                            {product.code}
                          </Typography>
                        </Box>
                      </Stack>

                      <Typography sx={{ fontSize: 17, fontWeight: 900 }}>
                        {product.qty}
                      </Typography>

                      <Typography sx={{ fontSize: 15, fontWeight: 900 }}>
                        {product.unit}
                      </Typography>

                      <Typography
                        sx={{
                          color: '#ff5d45',
                          fontWeight: 900,
                          fontSize: 14,
                          letterSpacing: 1,
                        }}
                      >
                        {product.total}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Section>

              <Section title="Payment Method">
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      md: 'repeat(3, 1fr)',
                    },
                    gap: 1.5,
                  }}
                >
                  <PaymentOption
                    active
                    icon={<FaMoneyBillWave />}
                    title="Cash"
                    subtitle="Physical Tender"
                  />

                  <PaymentOption
                    icon={<FaCreditCard />}
                    title="Card"
                    subtitle="Debit/Credit"
                  />

                  <PaymentOption
                    icon={<FaUniversity />}
                    title="Transfer"
                    subtitle="Bank/Wire"
                  />
                </Box>
              </Section>
            </Stack>

            <Stack spacing={2.5}>
              <ReceiptCard />
              <GoalCard />
            </Stack>
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
}

const tableHeaderSx = {
  fontSize: 11,
  color: 'text.secondary',
  fontWeight: 900,
  textTransform: 'uppercase',
};

type SectionProps = {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

function Section({ title, action, children }: SectionProps) {
  return (
    <Card
      sx={{
        p: 3,
        bgcolor: 'rgba(0, 20, 22, 0.72)',
        border: '1px solid rgba(255,255,255,0.20)',
        borderRadius: 3,
        boxShadow: 'none',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.6}>
        <Typography
          sx={{
            fontSize: 11,
            textTransform: 'uppercase',
            fontWeight: 900,
            letterSpacing: 0.3,
            color: 'text.secondary',
          }}
        >
          {title}
        </Typography>

        {action}
      </Stack>

      {children}
    </Card>
  );
}

type CategoryButtonProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

function CategoryButton({ icon, label, active }: CategoryButtonProps) {
  return (
    <Box
      sx={{
        height: 62,
        borderRadius: 1.5,
        border: active
          ? '1px solid #19d3d8'
          : '1px solid rgba(255,255,255,0.20)',
        bgcolor: active ? 'rgba(25,211,216,0.16)' : 'rgba(255,255,255,0.03)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        color: active ? 'primary.main' : 'text.secondary',
      }}
    >
      <Box sx={{ display: 'flex', fontSize: 21 }}>{icon}</Box>

      <Typography sx={{ fontSize: 12, fontWeight: 800 }}>
        {label}
      </Typography>
    </Box>
  );
}

type PaymentOptionProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  active?: boolean;
};

function PaymentOption({ icon, title, subtitle, active }: PaymentOptionProps) {
  return (
    <Box
      sx={{
        minHeight: 74,
        border: active
          ? '1px solid #19d3d8'
          : '1px solid rgba(255,255,255,0.22)',
        bgcolor: active ? 'rgba(25,211,216,0.18)' : 'transparent',
        borderRadius: 1.5,
        px: 2,
        py: 1.6,
        display: 'flex',
        alignItems: 'center',
        gap: 1.6,
      }}
    >
      <Box sx={{ color: 'primary.main', display: 'flex', fontSize: 20 }}>
        {icon}
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 900, fontSize: 16 }}>
          {title}
        </Typography>

        <Typography sx={{ color: 'text.secondary', fontSize: 12, fontWeight: 600 }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

function ProductThumb({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: 1,
        bgcolor: '#f4f6f6',
        display: 'grid',
        placeItems: 'center',
        color: '#002527',
        fontSize: 22,
        flexShrink: 0,
      }}
    >
      {children}
    </Box>
  );
}

function ReceiptCard() {
  return (
    <Card
      sx={{
        overflow: 'hidden',
        bgcolor: '#002d30',
        border: '1px solid rgba(255,255,255,0.22)',
        borderRadius: 3,
        boxShadow: 'none',
      }}
    >
      <Box sx={{ bgcolor: 'rgba(94,227,167,0.18)', p: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography
            sx={{
              fontSize: 11,
              textTransform: 'uppercase',
              fontWeight: 900,
              color: 'text.secondary',
            }}
          >
            Receipt Preview
          </Typography>

          <Box sx={{ color: 'primary.main', display: 'flex', fontSize: 20 }}>
            <FaReceipt />
          </Box>
        </Stack>

        <Typography sx={{ mt: 1.2, fontSize: 25, fontWeight: 900 }}>
          #INV-2024-082
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <Typography align="center" sx={{ fontWeight: 900, fontSize: 20 }}>
          Enterprise Hub
        </Typography>

        <Typography align="center" sx={{ color: 'text.secondary', fontSize: 11, fontWeight: 700 }}>
          123 Business Avenue, Tech City
        </Typography>

        <Divider sx={{ my: 2, borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.22)' }} />

        <Stack spacing={1.3}>
          <ReceiptInfoRow label="Date:" value="Oct 24, 2023 14:32" />
          <ReceiptInfoRow label="Customer:" value="Alex Rivera" />
        </Stack>

        <Stack spacing={1.3} sx={{ mt: 3 }}>
          {products.map((product) => (
            <Stack
              key={product.code}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <ProductThumb>{product.image}</ProductThumb>

                <Typography sx={{ fontSize: 14, fontWeight: 800 }}>
                  {product.qty}x {product.name}
                </Typography>
              </Stack>

              <Typography sx={{ color: '#ff5d45', fontWeight: 900, fontSize: 14 }}>
                {product.total}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Divider sx={{ my: 2.3, borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.22)' }} />

        <Stack spacing={1.2}>
          <AmountRow label="Subtotal" value="$54.00" />
          <AmountRow label="Tax (8%)" value="$4.32" />
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ mt: 1.6 }}>
          <Typography sx={{ color: 'primary.main', fontWeight: 900, fontSize: 20 }}>
            TOTAL
          </Typography>

          <Typography sx={{ color: 'primary.main', fontWeight: 900, fontSize: 22 }}>
            $58.32
          </Typography>
        </Stack>

        <Button
          fullWidth
          variant="contained"
          startIcon={<FaCheckCircle />}
          sx={{
            mt: 4,
            py: 1.6,
            color: '#002527',
            bgcolor: 'primary.main',
            fontSize: 15,
            borderRadius: 1.5,
            '&:hover': {
              bgcolor: '#15b9bd',
            },
          }}
        >
          Confirm Sale
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<FaPrint />}
          sx={{
            mt: 1,
            py: 1.5,
            color: 'text.primary',
            borderColor: 'rgba(255,255,255,0.55)',
            fontSize: 15,
            borderRadius: 1.5,
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'rgba(25,211,216,0.08)',
            },
          }}
        >
          Generate Receipt
        </Button>

        <Typography
          align="center"
          sx={{
            mt: 3.5,
            color: 'text.secondary',
            fontSize: 9,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
          }}
        >
          Powered by Enterprise Hub V4.0
        </Typography>
      </Box>
    </Card>
  );
}

function ReceiptInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography sx={{ fontSize: 11, color: 'text.secondary', fontWeight: 700 }}>
        {label}
      </Typography>

      <Typography sx={{ fontSize: 11, color: 'text.primary', fontWeight: 800 }}>
        {value}
      </Typography>
    </Stack>
  );
}

function AmountRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography sx={{ fontSize: 14, color: 'text.secondary', fontWeight: 700 }}>
        {label}
      </Typography>

      <Typography sx={{ fontSize: 15, color: 'text.primary', fontWeight: 900 }}>
        {value}
      </Typography>
    </Stack>
  );
}

function GoalCard() {
  return (
    <Card
      sx={{
        p: 2,
        bgcolor: 'rgba(0, 45, 48, 0.9)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 2.5,
        boxShadow: 'none',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            bgcolor: 'rgba(25,211,216,0.12)',
            color: 'primary.main',
            display: 'grid',
            placeItems: 'center',
            fontSize: 17,
          }}
        >
          <FaChartLine />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Stack direction="row" justifyContent="space-between" mb={0.8}>
            <Typography sx={{ color: 'text.secondary', fontSize: 12, fontWeight: 800 }}>
              Daily Transaction Goal
            </Typography>

            <Typography sx={{ color: 'primary.main', fontSize: 16, fontWeight: 900 }}>
              72%
            </Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={72}
            sx={{
              height: 4,
              borderRadius: 99,
              bgcolor: 'rgba(255,255,255,0.12)',
              '& .MuiLinearProgress-bar': {
                bgcolor: 'primary.main',
              },
            }}
          />
        </Box>
      </Stack>
    </Card>
  );
}