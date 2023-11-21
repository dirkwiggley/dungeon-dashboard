import { createTheme, responsiveFontSizes } from "@mui/material";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[700],
      light: grey[900],
      dark: grey[500],
      contrastText: "rgba(0, 0, 0, 1.0)",
    },
    secondary: {
      main: "rgba(245, 245, 245, 1.0)",
      // light: "rgba(92, 92, 92, 1.0)",
      // dark: "rgba(42, 42, 42, 1.0)",
      contrastText: "rgba(0, 0, 0, 1.0)",
    },
    background: {
      paper: "rgba(245, 245, 245, 1.0)",
    },
    // error: {
      
    // },
    info: {
      main: "rgba(0, 0, 0, 1.0)",
      contrastText: "rgba(0, 0, 0, 1.0)",
      // light: "rgba(0,0,0,1.0)",
    },
    // warning: {

    // },
    success: {
      main: "rgba(255,0,0,0.8)"
    },
    text: {
      primary: "rgba(0, 0, 0, 1.0)",
      secondary: "rgba(255, 255, 255, 1.0)",
      disabled: "rgba(127, 127, 127, 1.0)", 
    }
  },
  typography: {
    fontFamily: 'sans-serif'
  },
});

export const otherColors = {
  lighterGreen: "rgba(179,197,84,1.0)",
  lightGreen: "rgba(159,177,64,1.0)",
  darkerGreen: "rgba(139,157,44,1.0)"
}

export default responsiveFontSizes(theme);