"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/theme/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/query/queryClient";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
