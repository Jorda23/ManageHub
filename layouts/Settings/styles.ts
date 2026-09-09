import type { SxProps, Theme } from "@mui/material/styles";

export const pageContainerStyles: SxProps<Theme> = {
  width: "100%",
  px: {
    xs: 2,
    md: 4,
  },
  py: {
    xs: 2.5,
    md: 3,
  },
};

export const contentContainerStyles: SxProps<Theme> = {
  width: "100%",
  maxWidth: 1440,
  mx: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 2.5,
};

export const headerIconBoxStyles: SxProps<Theme> = {
  width: {
    xs: 38,
    md: 42,
  },
  height: {
    xs: 38,
    md: 42,
  },
  borderRadius: 2.5,
  display: "grid",
  placeItems: "center",
  bgcolor: "#eef4ff",
  color: "#315ccf",
  flexShrink: 0,
};

export const cardBodyStyles: SxProps<Theme> = {
  p: {
    xs: 2,
    md: 2.5,
  },
  display: "flex",
  flexDirection: "column",
  gap: 2,
};