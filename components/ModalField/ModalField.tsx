"use client";

import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

type ModalFieldProps = {
  label: string;
  htmlFor: string;
  children: ReactNode;
};

export function ModalField({ label, htmlFor, children }: ModalFieldProps) {
  return (
    <Box>
      <Typography
        component="label"
        htmlFor={htmlFor}
        sx={{
          display: "block",
          mb: 0.8,
          color: "#0f172a",
          fontSize: 10,
          fontWeight: 900,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </Typography>

      {children}
    </Box>
  );
}
