"use client";

import type { ChangeEventHandler, ReactNode } from "react";

import { Box, InputAdornment, TextField, Typography } from "@mui/material";

const colors = {
  white: "#ffffff",
  text: "#101828",
  border: "#d8e2de",
  inputBg: "#f8faf9",
  green: "#164c38",
};

type LoginFieldProps = {
  label: string;
  placeholder: string;
  icon: ReactNode;
  value: string;

  type?: string;
  autoComplete?: string;
  endAdornment?: ReactNode;

  onChange: ChangeEventHandler<HTMLInputElement>;
};

export function LoginField({
  label,
  placeholder,
  icon,
  value,
  type = "text",
  autoComplete,
  endAdornment,
  onChange,
}: LoginFieldProps) {
  return (
    <Box>
      <Typography
        component="label"
        sx={{
          display: "block",
          mb: 0.7,
          color: colors.text,
          fontSize: 9.5,
          fontWeight: 950,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </Typography>

      <TextField
        fullWidth
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    color: "#7a8883",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {icon}
                </Box>
              </InputAdornment>
            ),

            endAdornment: endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : undefined,
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            minHeight: 48,
            borderRadius: "6px",
            bgcolor: colors.inputBg,
            color: colors.text,
            fontWeight: 650,

            "& fieldset": {
              borderColor: colors.border,
            },

            "&:hover fieldset": {
              borderColor: "#a6b5af",
            },

            "&.Mui-focused": {
              bgcolor: colors.white,
              boxShadow: "0 0 0 3px rgba(22,76,56,0.08)",
            },

            "&.Mui-focused fieldset": {
              borderColor: colors.green,
              borderWidth: 1.2,
            },
          },

          "& .MuiInputBase-input": {
            color: colors.text,
            fontSize: 12.5,
            fontWeight: 650,
            py: 1.2,

            "&::placeholder": {
              color: "#8b9893",
              opacity: 1,
            },
          },
        }}
      />
    </Box>
  );
}
