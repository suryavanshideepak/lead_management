import { createTheme } from "@mui/material/styles";

export const FONT_MAP = {
  Inter: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
  'Public Sans': `'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
};

export const FONT_SCALES = {
  small: {
    htmlFontSize: 14.5,
    fontSize: 13,
    h1: { fontSize: "1.95rem", fontWeight: 700 },
    h2: { fontSize: "1.6rem", fontWeight: 700 },
    h3: { fontSize: "1.3rem", fontWeight: 700 },
    h4: { fontSize: "1.1rem", fontWeight: 700 },
    h5: { fontSize: "0.95rem", fontWeight: 600 },
    h6: { fontSize: "0.85rem", fontWeight: 600 },
    body1: { fontSize: "0.8rem" },
    body2: { fontSize: "0.725rem" },
    button: { textTransform: "none", fontWeight: 600, fontSize: "0.775rem" },
    caption: { fontSize: "0.7rem" },
  },
  medium: {
    htmlFontSize: 16,
    fontSize: 14,
    h1: { fontSize: "2.25rem", fontWeight: 700 },
    h2: { fontSize: "1.875rem", fontWeight: 700 },
    h3: { fontSize: "1.5rem", fontWeight: 700 },
    h4: { fontSize: "1.25rem", fontWeight: 700 },
    h5: { fontSize: "1.1rem", fontWeight: 600 },
    h6: { fontSize: "0.95rem", fontWeight: 600 },
    body1: { fontSize: "0.875rem" },
    body2: { fontSize: "0.8rem" },
    button: { textTransform: "none", fontWeight: 600, fontSize: "0.825rem" },
    caption: { fontSize: "0.75rem" },
  },
  large: {
    htmlFontSize: 17.5,
    fontSize: 15.5,
    h1: { fontSize: "2.5rem", fontWeight: 700 },
    h2: { fontSize: "2.1rem", fontWeight: 700 },
    h3: { fontSize: "1.7rem", fontWeight: 700 },
    h4: { fontSize: "1.4rem", fontWeight: 700 },
    h5: { fontSize: "1.22rem", fontWeight: 600 },
    h6: { fontSize: "1.05rem", fontWeight: 600 },
    body1: { fontSize: "0.95rem" },
    body2: { fontSize: "0.875rem" },
    button: { textTransform: "none", fontWeight: 600, fontSize: "0.9rem" },
    caption: { fontSize: "0.8rem" },
  },
};

export const COLOR_PALETTES = {
  emerald: {
    id: 'emerald',
    name: 'Emerald (Original)',
    main: '#10b981',
    light: '#34d399',
    dark: '#059669',
    contrastText: '#ffffff',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    subtleBg: '#ecfdf5',
  },
  blue: {
    id: 'blue',
    name: 'Sky Blue',
    main: '#0ea5e9',
    light: '#7dd3fc',
    dark: '#0284c7',
    contrastText: '#ffffff',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
    subtleBg: '#f0f9ff',
  },
  purple: {
    id: 'purple',
    name: 'Soft Lavender',
    main: '#818cf8',
    light: '#c7d2fe',
    dark: '#6366f1',
    contrastText: '#ffffff',
    gradient: 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%)',
    subtleBg: '#f5f3ff',
  },
  orange: {
    id: 'orange',
    name: 'Warm Peach',
    main: '#fb923c',
    light: '#fed7aa',
    dark: '#ea580c',
    contrastText: '#ffffff',
    gradient: 'linear-gradient(135deg, #fdba74 0%, #fb923c 100%)',
    subtleBg: '#fff7ed',
  },
  rose: {
    id: 'rose',
    name: 'Pastel Rose',
    main: '#fb7185',
    light: '#fecdd3',
    dark: '#f43f5e',
    contrastText: '#ffffff',
    gradient: 'linear-gradient(135deg, #fda4af 0%, #fb7185 100%)',
    subtleBg: '#fff1f2',
  },
};

export const getAppTheme = (mode = "light", options = {}) => {
  const isDark = mode === "dark";
  const fontFamilyKey = options.fontFamily === 'Public Sans' ? 'Public Sans' : 'Inter';
  const selectedFont = FONT_MAP[fontFamilyKey] || FONT_MAP['Inter'];
  const scaleKey = ['small', 'large'].includes(options.fontSize) ? options.fontSize : 'medium';
  const scale = FONT_SCALES[scaleKey];
  const primaryColorKey = options.primaryColor || 'emerald';
  const colorPreset = COLOR_PALETTES[primaryColorKey] || COLOR_PALETTES.emerald;

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colorPreset.main,
        light: colorPreset.light,
        dark: colorPreset.dark,
        contrastText: colorPreset.contrastText,
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
      fontFamily: selectedFont,
      ...scale,
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            '--primary-main': colorPreset.main,
            '--primary-light': colorPreset.light,
            '--primary-dark': colorPreset.dark,
            '--primary-gradient': colorPreset.gradient,
            '--primary-subtle-bg': colorPreset.subtleBg,
          },
          html: {
            fontSize: scale.htmlFontSize,
          },
          body: {
            fontFamily: selectedFont,
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