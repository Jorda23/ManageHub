import type { ReactNode } from "react";
import {
  Button,
  CircularProgress,
  type ButtonProps,
  type SxProps,
  type Theme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

export type BusinessButtonIntent =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";

export type BusinessButtonAppearance =
  | "solid"
  | "outlined"
  | "tonal"
  | "ghost";

export type BusinessButtonSize = "small" | "medium" | "large";

export interface BusinessButtonProps
  extends Omit<ButtonProps, "variant" | "color" | "size"> {
  intent?: BusinessButtonIntent;
  appearance?: BusinessButtonAppearance;
  buttonSize?: BusinessButtonSize;
  loading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
}

interface IntentColors {
  main: string;
  dark: string;
  contrast: string;
  tonalBackground: string;
  tonalText: string;
  border: string;
}

const getIntentColors = (
  theme: Theme,
  intent: BusinessButtonIntent,
): IntentColors => {
  const paletteByIntent = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
  };

  const palette = paletteByIntent[intent];

  return {
    main: palette.main,
    dark: palette.dark,
    contrast: palette.contrastText,
    tonalBackground: alpha(palette.main, 0.12),
    tonalText: palette.dark,
    border: palette.main,
  };
};

const getAppearanceStyles = (
  colors: IntentColors,
  appearance: BusinessButtonAppearance,
): SxProps<Theme> => {
  const styles: Record<BusinessButtonAppearance, SxProps<Theme>> = {
    solid: {
      color: colors.contrast,
      backgroundColor: colors.main,
      border: `1px solid ${colors.main}`,

      "&:hover": {
        backgroundColor: colors.dark,
        borderColor: colors.dark,
      },
    },

    outlined: {
      color: colors.main,
      backgroundColor: "transparent",
      border: `1px solid ${colors.border}`,

      "&:hover": {
        color: colors.dark,
        backgroundColor: colors.tonalBackground,
        borderColor: colors.dark,
      },
    },

    tonal: {
      color: colors.tonalText,
      backgroundColor: colors.tonalBackground,
      border: "1px solid transparent",

      "&:hover": {
        color: colors.dark,
        backgroundColor: alpha(colors.main, 0.18),
      },
    },

    ghost: {
      color: colors.main,
      backgroundColor: "transparent",
      border: "1px solid transparent",

      "&:hover": {
        color: colors.dark,
        backgroundColor: colors.tonalBackground,
      },
    },
  };

  return styles[appearance];
};

const getSizeStyles = (
  buttonSize: BusinessButtonSize,
): SxProps<Theme> => {
  const styles: Record<BusinessButtonSize, SxProps<Theme>> = {
    small: {
      minHeight: 32,
      px: 1.5,
      py: 0.5,
      borderRadius: "8px",
      fontSize: 12,
      lineHeight: 1.2,

      "& .MuiButton-startIcon, & .MuiButton-endIcon": {
        marginInline: 0.5,

        "& svg": {
          width: 15,
          height: 15,
        },
      },

      "& .MuiCircularProgress-root": {
        width: "14px !important",
        height: "14px !important",
      },
    },

    medium: {
      minHeight: 40,
      px: 2.25,
      py: 0.9,
      borderRadius: "10px",
      fontSize: 14,
      lineHeight: 1.2,

      "& .MuiButton-startIcon, & .MuiButton-endIcon": {
        marginInline: 0.75,

        "& svg": {
          width: 17,
          height: 17,
        },
      },

      "& .MuiCircularProgress-root": {
        width: "16px !important",
        height: "16px !important",
      },
    },

    large: {
      minHeight: 48,
      px: 3,
      py: 1.2,
      borderRadius: "12px",
      fontSize: 15,
      lineHeight: 1.25,

      "& .MuiButton-startIcon, & .MuiButton-endIcon": {
        marginInline: 1,

        "& svg": {
          width: 20,
          height: 20,
        },
      },

      "& .MuiCircularProgress-root": {
        width: "18px !important",
        height: "18px !important",
      },
    },
  };

  return styles[buttonSize];
};

export function BusinessButton({
  intent = "primary",
  appearance = "solid",
  buttonSize = "medium",
  loading = false,
  loadingText,
  icon,
  startIcon,
  endIcon,
  disabled,
  children,
  sx,
  ...buttonProps
}: BusinessButtonProps) {
  return (
    <Button
      {...buttonProps}
      variant="contained"
      disableElevation
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      startIcon={
        loading ? (
          <CircularProgress thickness={5} color="inherit" />
        ) : (
          (startIcon ?? icon)
        )
      }
      endIcon={loading ? undefined : endIcon}
      sx={[
        (theme) => {
          const colors = getIntentColors(theme, intent);

          return {
            width: "100%",
            boxSizing: "border-box",
            fontWeight: 700,
            letterSpacing: "0.01em",
            textTransform: "none",
            whiteSpace: "nowrap",

            transition: theme.transitions.create(
              [
                "background-color",
                "border-color",
                "color",
                "box-shadow",
                "transform",
              ],
              {
                duration: 160,
              },
            ),

            "&:active": {
              transform: "translateY(1px)",
            },

            "&.Mui-disabled": {
              color: theme.palette.action.disabled,
              backgroundColor: theme.palette.action.disabledBackground,
              borderColor: theme.palette.divider,
            },

            "&.Mui-focusVisible": {
              outline: `3px solid ${alpha(colors.main, 0.25)}`,
              outlineOffset: 2,
            },
          };
        },

        getSizeStyles(buttonSize),

        (theme) => {
          const colors = getIntentColors(theme, intent);

          return getAppearanceStyles(colors, appearance);
        },

        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {loading && loadingText ? loadingText : children}
    </Button>
  );
}