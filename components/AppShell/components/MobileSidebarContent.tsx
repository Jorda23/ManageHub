"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { AppShellProps, sidebarSections } from "@/shared";
import { colors } from "@/theme/sharedColors";

import { SidebarLink } from "./SidebarLink";
import { UserCard } from "./UserCard";

type MobileSidebarContentProps = {
  active?: AppShellProps["active"];
  onClose: () => void;
};

export function MobileSidebarContent({ active, onClose }: Readonly<MobileSidebarContentProps>) {
  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: colors.cardBg,
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${colors.cardBorder}`,
          bgcolor: colors.tableHead,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: colors.primary,
              fontSize: 18,
              fontWeight: 950,
              lineHeight: 1,
            }}
          >
            AssetHub
          </Typography>

          <Typography
            sx={{
              mt: 0.45,
              color: colors.muted,
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            Business Management Suite
          </Typography>
        </Box>

        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            width: 38,
            height: 38,
            borderRadius: "14px",
            border: `1px solid ${colors.cardBorder}`,
            bgcolor: colors.cardBg,
            color: colors.primary,
            boxShadow: "0 8px 18px rgba(15, 23, 42, 0.08)",
            "&:hover": {
              bgcolor: colors.primarySoft,
            },
          }}
        >
          <FaTimes size={13} />
        </IconButton>
      </Box>

      <Box
        sx={{
          px: 1.5,
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {sidebarSections.map((section) => (
          <Box
            key={section.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.6,
            }}
          >
            <Typography
              sx={{
                px: 1,
                color: colors.softMuted,
                fontSize: 9.5,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {section.title}
            </Typography>

            {section.items.map((item) => (
              <SidebarLink key={item.key} item={item} active={active} onClick={onClose} />
            ))}
          </Box>
        ))}
      </Box>

      <Box sx={{ flex: 1 }} />

      <UserCard />
    </Box>
  );
}
