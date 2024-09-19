import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(16, 152, 247)", // Custom primary color (blue)
    },
    secondary: {
      main: "#ff4081", // Custom secondary color (pink)
    },
    error: {
      main: "#f44336", // Custom error color (red)
    },
    warning: {
      main: "#ffa726", // Custom warning color (orange)
    },
    info: {
      main: "#2196f3", // Custom info color (blue)
    },
    success: {
      main: "#4caf50", // Custom success color (green)
    },
    background: {
      default: "#f5f5f5", // Background color
      paper: "#ffffff", // Paper background color
    },
    text: {
      primary: "#000000", // Primary text color
      secondary: "#757575", // Secondary text color
    },
  },
});

export default theme;
