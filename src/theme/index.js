import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`, 
    fontSize: 11, 
    h1: {
      fontSize: "2.5rem", 
    },
    h2: {
      fontSize: "2rem", 
    },
    h3: {
      fontSize: "1.75rem",
    },
    h4: {
      fontSize: "1.5rem",
    },
    h5: {
      fontSize: "1.25rem",
    },
    h6: {
      fontSize: "1rem",
    },
    body1: {
      fontSize: "0.875rem", 
    },
    body2: {
      fontSize: "0.75rem", 
    },
  }
});

export default theme;