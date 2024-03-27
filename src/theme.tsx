// import {
//   CommonColors,
//   PaletteMode,
//   TypeAction,
//   TypeBackground,
//   TypeText,
// } from "@mui/material";
// import { blue, pink, red } from "@mui/material/colors";
import { createTheme, PaletteColorOptions } from "@mui/material/styles";
// import {
//   ColorPartial,
//   PaletteTonalOffset,
// } from "@mui/material/styles/createPalette";

export const appTheme = createTheme({
  palette: {
    background: {
      default: "#f0f2f5",
      paper: "white",
    },
    text: {
      primary: "#000000",
    },
  },
});
