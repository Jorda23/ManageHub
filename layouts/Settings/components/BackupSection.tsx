"use client";

import { FaDatabase, FaDownload } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa6";

import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { SectionCard } from "@/components";
import { colors, palette } from "@/theme/sharedColors";

import { useExportBackup } from "../hooks/useExportBackup";
import { useExportExcel } from "../hooks/useExportExcel";

export function BackupSection() {
  const { exportBackup, isPending: isBackupPending } = useExportBackup();
  const { exportExcel, isPending: isExcelPending } = useExportExcel();

  return (
    <SectionCard>
      <Box
        sx={{
          p: {
            xs: 2,
            md: 2.5,
          },
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.25,
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              flexShrink: 0,
              borderRadius: "10px",
              display: "grid",
              placeItems: "center",
              bgcolor: colors.primarySoft,
              color: colors.primaryLight,
            }}
          >
            <FaDatabase size={15} />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                color: colors.text,
                fontSize: 14,
                lineHeight: 1.2,
                fontWeight: 850,
              }}
            >
              Respaldo de datos
            </Typography>

            <Typography
              sx={{
                mt: 0.3,
                color: colors.muted,
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              Exporta toda la información del negocio en JSON o Excel.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.25,
            flexWrap: "wrap",
          }}
        >
          <Button
            type="button"
            variant="outlined"
            disabled={isBackupPending || isExcelPending}
            startIcon={
              isBackupPending ? (
                <CircularProgress
                  size={13}
                  thickness={5}
                  color="inherit"
                  aria-label="Generando respaldo"
                />
              ) : (
                <FaDownload size={12} />
              )
            }
            onClick={() => exportBackup()}
            aria-busy={isBackupPending}
            sx={buttonStyles}
          >
            {isBackupPending ? "Generando..." : "Exportar JSON"}
          </Button>

          <Button
            type="button"
            variant="contained"
            disabled={isBackupPending || isExcelPending}
            startIcon={
              isExcelPending ? (
                <CircularProgress
                  size={13}
                  thickness={5}
                  color="inherit"
                  aria-label="Generando Excel"
                />
              ) : (
                <FaFileExcel size={12} />
              )
            }
            onClick={() => exportExcel()}
            aria-busy={isExcelPending}
            sx={{
              ...buttonStyles,
              bgcolor: colors.green,
              color: "#ffffff",
              "&:hover": {
                bgcolor: palette.emerald[900],
              },
              "&.Mui-disabled": {
                bgcolor: colors.green,
                color: "#ffffff",
                opacity: 0.6,
              },
            }}
          >
            {isExcelPending ? "Generando..." : "Exportar a Excel"}
          </Button>
        </Box>
      </Box>
    </SectionCard>
  );
}

const buttonStyles = {
  minHeight: 36,
  px: 2,
  borderRadius: "12px",
  border: `1px solid ${colors.primaryBorder}`,
  bgcolor: colors.primarySoft,
  color: colors.primary,
  fontSize: 12,
  fontWeight: 800,
  textTransform: "none" as const,
  "&:hover": {
    bgcolor: colors.primarySoft,
    borderColor: colors.primary,
    boxShadow: "none",
  },
  "&.Mui-disabled": {
    bgcolor: colors.primarySoft,
    color: colors.primary,
    opacity: 0.65,
  },
};