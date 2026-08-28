"use client";

import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs, { type Dayjs } from "dayjs";

import { colors } from "@/theme/sharedColors";

import type { HistoryFiltersValue } from "../history.types";

type HistoryFiltersProps = {
  value: HistoryFiltersValue;
  onChange: (value: HistoryFiltersValue) => void;
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
};

export function HistoryFilters({ value, onChange }: Readonly<HistoryFiltersProps>) {
  const updateFilter = <K extends keyof HistoryFiltersValue>(
    field: K,
    fieldValue: HistoryFiltersValue[K],
  ) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  };

  const handleDateChange = (field: "from" | "to", date: Dayjs | null) => {
    updateFilter(field, date?.isValid() ? date.format("YYYY-MM-DD") : "");
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
            sm: "1fr 1fr",
            lg: "2fr 1fr 1fr 1fr",
          },
          gap: 1.5,
          bgcolor: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: "16px",
          boxShadow: "0 6px 18px rgba(15, 23, 42, 0.04)",
        }}
      >
        <Box
          sx={{
            gridColumn: {
              xs: "auto",
              sm: "1 / -1",
              lg: "auto",
            },
          }}
        >
          <FilterLabel>Buscar</FilterLabel>

          <TextField
            size="small"
            placeholder="Buscar por cliente, producto o propiedad..."
            value={value.search}
            onChange={(event) => updateFilter("search", event.target.value)}
            fullWidth
            sx={inputSx}
          />
        </Box>

        <FilterField label="Tipo">
          <Select
            size="small"
            value={value.type}
            onChange={(event) => updateFilter("type", event.target.value as HistoryFiltersValue["type"])}
            fullWidth
            sx={inputSx}
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="hardware">Ferretería</MenuItem>
            <MenuItem value="grains">Granos básicos</MenuItem>
            <MenuItem value="property">Terrenos</MenuItem>
          </Select>
        </FilterField>

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
    <FormControl fullWidth>
      <FilterLabel>{label}</FilterLabel>
      {children}
    </FormControl>
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
