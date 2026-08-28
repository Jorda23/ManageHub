import { colors } from "@/theme/sharedColors";
import { Box, Typography, Divider } from "@mui/material";

type FormSectionProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export function FormSection({ title, description, icon, children }: Readonly<FormSectionProps>) {
  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: "14px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          px: {
            xs: 2,
            md: 2.5,
          },
          py: 1.75,
          display: "flex",
          alignItems: "center",
          gap: 1.25,
        }}
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            flexShrink: 0,
            borderRadius: "9px",
            display: "grid",
            placeItems: "center",
            bgcolor: colors.primarySoft,
            color: colors.primaryLight,
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography
            sx={{
              color: colors.text,
              fontSize: 14,
              lineHeight: 1.2,
              fontWeight: 850,
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              mt: 0.3,
              color: colors.muted,
              fontSize: 11,
              fontWeight: 500,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box
        sx={{
          p: {
            xs: 2,
            md: 2.5,
          },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
