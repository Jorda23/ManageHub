"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import { FaArrowRightFromBracket } from "react-icons/fa6";

import { removeToken } from "@/utils/auth";
import { colors } from "@/theme/sharedColors";

type LogoutButtonProps = {
  onClick?: () => void;
};

export function LogoutButton({ onClick }: Readonly<LogoutButtonProps>) {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    onClick?.();
    router.replace("/login");
  };

  return (
    <Button
      fullWidth
      onClick={handleLogout}
      startIcon={<FaArrowRightFromBracket size={13} />}
      sx={{
        justifyContent: "flex-start",
        px: 1.6,
        py: 1.1,
        borderRadius: "14px",
        bgcolor: "transparent",
        color: colors.danger,
        fontSize: 12.5,
        fontWeight: 800,
        textTransform: "none",
        border: `1px solid ${colors.dangerBorder}`,
        transition: "0.18s ease",
        "&:hover": {
          bgcolor: colors.dangerSoft,
        },
      }}
    >
      <Typography
        sx={{
          fontSize: 12.5,
          fontWeight: 800,
        }}
      >
        Cerrar sesión
      </Typography>
    </Button>
  );
}
