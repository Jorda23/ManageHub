import {
  alpha,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  FaArrowRight,
  FaFingerprint,
  FaLock,
  FaShieldAlt,
  FaUserAlt,
} from 'react-icons/fa';
import { FaWandSparkles } from 'react-icons/fa6';

const highlights = [
  {
    label: 'Secure access',
    value: 'MFA ready',
  },
  {
    label: 'Uptime',
    value: '99.98%',
  },
  {
    label: 'Avg login',
    value: '8 sec',
  },
];

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: {
          xs: 2,
          md: 4,
        },
        py: {
          xs: 3,
          md: 5,
        },
        bgcolor: '#001315',
        backgroundImage: `
          radial-gradient(circle at 12% 18%, rgba(25, 211, 216, 0.22), transparent 24%),
          radial-gradient(circle at 88% 12%, rgba(94, 227, 167, 0.16), transparent 22%),
          radial-gradient(circle at 50% 100%, rgba(0, 0, 0, 0.32), transparent 30%)
        `,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.16,
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1200,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            lg: '1.05fr 0.95fr',
          },
          gap: 3,
          alignItems: 'stretch',
        }}
      >
        <Card
          sx={{
            p: {
              xs: 3,
              md: 4.5,
            },
            borderRadius: 5,
            overflow: 'hidden',
            bgcolor: alpha('#001d1f', 0.9),
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.34)',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(25,211,216,0.12), rgba(255,255,255,0) 45%)',
              pointerEvents: 'none',
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Chip
              icon={<FaWandSparkles />}
              label="Enterprise Hub"
              sx={{
                mb: 2,
                bgcolor: alpha('#19d3d8', 0.12),
                color: 'primary.main',
                fontWeight: 800,
                '& .MuiChip-icon': {
                  color: 'inherit',
                },
              }}
            />

            <Typography
              sx={{
                fontSize: {
                  xs: 34,
                  md: 46,
                },
                fontWeight: 950,
                lineHeight: 0.98,
                maxWidth: 520,
              }}
            >
              Secure login for the new generation of operations.
            </Typography>

            <Typography
              sx={{
                mt: 2,
                maxWidth: 560,
                color: 'text.secondary',
                fontSize: {
                  xs: 15,
                  md: 16,
                },
                fontWeight: 600,
              }}
            >
              One workspace for sales, CRM, and inventory, with a polished sign-in flow
              that feels fast on desktop and mobile.
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(3, minmax(0, 1fr))',
                },
                gap: 1.5,
                mt: 4,
                maxWidth: 620,
              }}
            >
              {highlights.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: alpha('#ffffff', 0.03),
                    border: '1px solid rgba(255,255,255,0.09)',
                  }}
                >
                  <Typography sx={{ color: 'text.secondary', fontSize: 11, fontWeight: 800 }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ mt: 0.5, fontSize: 17, fontWeight: 900 }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider
              sx={{
                my: 4,
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            />

            <Stack
              direction="row"
              spacing={1.2}
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              <Chip
                icon={<FaShieldAlt />}
                label="Encrypted session"
                sx={{
                  bgcolor: alpha('#5ee3a7', 0.12),
                  color: 'secondary.main',
                  fontWeight: 800,
                  '& .MuiChip-icon': { color: 'inherit' },
                }}
              />
              <Chip
                icon={<FaFingerprint />}
                label="Biometric ready"
                sx={{
                  bgcolor: alpha('#19d3d8', 0.12),
                  color: 'primary.main',
                  fontWeight: 800,
                  '& .MuiChip-icon': { color: 'inherit' },
                }}
              />
            </Stack>
          </Box>
        </Card>

        <Card
          sx={{
            p: {
              xs: 3,
              md: 4,
            },
            borderRadius: 5,
            bgcolor: alpha('#001a1c', 0.88),
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.34)',
            backdropFilter: 'blur(18px)',
            display: 'grid',
            alignContent: 'center',
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', fontWeight: 800 }}>
              Welcome back
            </Typography>
            <Typography sx={{ mt: 0.5, fontSize: 28, fontWeight: 950, lineHeight: 1.05 }}>
              Sign in to Enterprise Hub
            </Typography>
            <Typography sx={{ mt: 1, color: 'text.secondary', fontSize: 14, fontWeight: 600 }}>
              Use your business account to continue into the dashboard.
            </Typography>
          </Box>

          <Stack >
            <Field
              label="Email"
              placeholder="admin@enterprisehub.com"
              icon={<FaUserAlt />}
            />

            <Field
              label="Password"
              placeholder="Enter your password"
              icon={<FaLock />}
              type="password"
            />

            <Stack
            >
              <Typography sx={{ fontSize: 12.5, color: 'text.secondary', fontWeight: 600 }}>
                Secure sign-in enabled
              </Typography>

              <Button
                size="small"
                variant="text"
                sx={{
                  minWidth: 0,
                  p: 0,
                  color: 'primary.main',
                  fontWeight: 800,
                }}
              >
                Forgot password?
              </Button>
            </Stack>

            <Button
              href="/activity"
              fullWidth
              variant="contained"
              endIcon={<FaArrowRight />}
              sx={{
                py: 1.5,
                borderRadius: 2.5,
                bgcolor: 'primary.main',
                color: '#001f21',
                boxShadow: '0 14px 32px rgba(25,211,216,0.2)',
                '&:hover': {
                  bgcolor: '#16bcc0',
                },
              }}
            >
              Log in to dashboard
            </Button>

            <Button
              variant="outlined"
              startIcon={<FaFingerprint />}
              sx={{
                py: 1.4,
                borderRadius: 2.5,
                borderColor: 'rgba(255,255,255,0.18)',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: alpha('#19d3d8', 0.06),
                },
              }}
            >
              Use biometric login
            </Button>
          </Stack>

          <Divider
            sx={{
              my: 3,
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          />

          <Typography sx={{ color: 'text.secondary', fontSize: 12, fontWeight: 600 }}>
            No account yet? Contact your administrator for access.
          </Typography>
        </Card>
      </Box>
    </Box>
  );
}

function Field({
  label,
  placeholder,
  icon,
  type = 'text',
}: {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
}) {
  return (
    <Box>
      <Typography
        sx={{
          mb: 0.8,
          color: 'text.secondary',
          fontSize: 11,
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
        }}
      >
        {label}
      </Typography>
      <TextField
        fullWidth
        type={type}
        placeholder={placeholder}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <Box
              sx={{
                mr: 1.2,
                color: 'text.secondary',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {icon}
            </Box>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2.5,
            bgcolor: alpha('#ffffff', 0.03),
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.12)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(25,211,216,0.28)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
          '& .MuiInputBase-input': {
            color: 'text.primary',
            fontSize: 14,
            fontWeight: 700,
            py: 1.4,
          },
        }}
      />
    </Box>
  );
}
