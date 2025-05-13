import { createTheme } from "@vanilla-extract/css";

export const [themeClass, vars] = createTheme({
  fontSize: {
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
  },
  color: {
    red: "#FF0000",
    blue: "#AEC6CF",
    gray: "#D3D3D3",
  },
});
