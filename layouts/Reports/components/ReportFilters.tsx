"use client";

import { Box, Button, Typography, type SxProps, type Theme } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs, { type Dayjs } from "dayjs";

import { FaEraser } from "react-icons/fa";

import { colors } from "@/theme/sharedColors";

import type { ReportFilters } from "../types/reports.types";

type ReportFiltersProps = {
  value: ReportFilters;
  onChange: (next: ReportFilters) => void;
};

const inputSx: SxProps<Theme> = {
  minWidth: 0,

  "& .MuiOutlinedInput-root": {
    minHeight: {
      xs: 42,
      sm: 44,
    },
    borderRadius: {
      xs: "12px",
      sm: "14px",
    },
    bgcolor: "#fbfdfc",
    fontSize: 14,
    fontWeight: 600,
    color: colors.text,

    "& fieldset": {
      borderColor: colors.cardBorder,
    },

    "&:hover fieldset": {
      borderColor: "#94a3b8",
    },

    "&.Mui-focused fieldset": {
      borderColor: colors.primaryLight,
      borderWidth: 1.5,
    },

    "&.Mui-error fieldset": {
      borderColor: colors.danger,
    },
  },

  "& .MuiInputBase-input": {
    minWidth: 0,
    px: {
      xs: 1.5,
      sm: 1.75,
    },
  },

  "& .MuiInputBase-input::placeholder": {
    color: colors.softMuted,
    opacity: 1,
  },

  "& .MuiSvgIcon-root": {
    color: colors.muted,
  },
};

export function ReportFilters({ value, onChange }: Readonly<ReportFiltersProps>) {
  const hasFilters = Boolean(value.from || value.to);

  const handleDateChange = (field: "from" | "to", date: Dayjs | null) => {
    onChange({
      ...value,
      [field]: date?.isValid()
        ? (field === "from" ? date.startOf("day") : date.endOf("day")).toISOString()
        : undefined,
    });
  };

  const handleClear = () => {
    onChange({});
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          p: {
            xs: 1.5,
            sm: 2,
          },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "minmax(0, 1fr) minmax(0, 1fr) auto",
          },
          alignItems: "end",
          gap: 1.5,
          bgcolor: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: "16px",
          boxShadow: "0 6px 18px rgba(15, 23, 42, 0.04)",
        }}
      >
        <FilterField label="Desde">
          <DatePicker
            value={value.from ? dayjs(value.from) : null}
            onChange={(date) => handleDateChange("from", date)}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                sx: inputSx,
              },
            }}
          />
        </FilterField>

        <FilterField label="Hasta">
          <DatePicker
            value={value.to ? dayjs(value.to) : null}
            onChange={(date) => handleDateChange("to", date)}
            format="DD/MM/YYYY"
            minDate={value.from ? dayjs(value.from) : undefined}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                sx: inputSx,
              },
            }}
          />
        </FilterField>

        <Button
          type="button"
          onClick={handleClear}
          disabled={!hasFilters}
          startIcon={<FaEraser size={12} />}
          disableElevation
          sx={{
            height: {
              xs: 42,
              sm: 44,
            },
            px: 2,
            borderRadius: {
              xs: "12px",
              sm: "14px",
            },
            color: colors.muted,
            bgcolor: "#fbfdfc",
            border: `1px solid ${colors.cardBorder}`,
            fontSize: 12,
            fontWeight: 800,
            textTransform: "none",

            "&:hover:not(:disabled)": {
              color: colors.danger,
              bgcolor: colors.dangerSoft,
              borderColor: colors.dangerBorder,
            },

            "&.Mui-disabled": {
              bgcolor: colors.tableHead,
              color: colors.softMuted,
            },
          }}
        >
          Limpiar
        </Button>
      </Box>
    </LocalizationProvider>
  );
}

function FilterField({
  label,
  children,
}: Readonly<{
  label: string;
  children: React.ReactNode;
}>) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <FilterLabel>{label}</FilterLabel>
      {children}
    </Box>
  );
}

function FilterLabel({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Typography
      sx={{
        mb: 0.55,
        color: colors.muted,
        fontSize: 10,
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}
    >
      {children}
    </Typography>
  );
}