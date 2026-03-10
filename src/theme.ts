import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2ebc58",
    },
    background: {
      default: "#1a1a1a",
      paper: "#282828",
    },
  },
  typography: {
    fontFamily: "Dosis, Arial, sans-serif",
  },
});
