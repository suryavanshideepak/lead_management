import { createTheme } from "@mui/material/styles";

export const getAppTheme = (mode = "light") => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#10b981",
        light: "#34d399",
        dark: "#059669",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#6366f1",
        light: "#818cf8",
        dark: "#4f46e5",
        contrastText: "#ffffff",
      },
      background: {
        default: isDark ? "#0b0f19" : "#f8fafc",
        paper: isDark ? "#111827" : "#ffffff",
      },
      text: {
        primary: isDark ? "#f8fafc" : "#0f172a",
        secondary: isDark ? "#94a3b8" : "#64748b",
      },
      divider: isDark ? "#1e293b" : "#e2e8f0",
      action: {
        hover: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
        selected: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
      },
    },
    typography: {
      fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
      h1: { fontSize: "2.25rem", fontWeight: 700 },
      h2: { fontSize: "1.875rem", fontWeight: 700 },
      h3: { fontSize: "1.5rem", fontWeight: 700 },
      h4: { fontSize: "1.25rem", fontWeight: 700 },
      h5: { fontSize: "1.1rem", fontWeight: 600 },
      h6: { fontSize: "0.95rem", fontWeight: 600 },
      body1: { fontSize: "0.875rem" },
      body2: { fontSize: "0.8rem" },
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? "#0b0f19" : "#f8fafc",
            color: isDark ? "#f8fafc" : "#0f172a",
            transition: "background-color 0.25s ease, color 0.25s ease",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: isDark ? "#111827" : "#ffffff",
            transition: "background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#111827" : "#ffffff",
            border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`,
            borderRadius: 14,
            transition: "all 0.25s ease-in-out",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.825rem",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: isDark ? "#1e293b" : "#f1f5f9",
          },
        },
      },
    },
  });
};

const theme = getAppTheme("light");
export default theme;