import { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { blue, deepOrange, blueGrey } from "@mui/material/colors";

export const ThemeContext = createContext();

const body = document.querySelector("body");

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(
    useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light"
  );

  const getDesignTokens = (mode) => ({
    typography: {
      fontFamily: "Comfortaa",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
    palette: {
      mode,
      primary: {
        ...deepOrange,
        ...(mode === "dark" && {
          main: deepOrange[300],
        }),
      },
      secondary: {
        ...blue,
        ...(mode === "dark" && {
          main: blue[300],
        }),
      },
      ...(mode === "dark" && {
        background: {
          default: blueGrey[900],
          paper: blueGrey[800],
        },
      }),
      text: {
        ...(mode === "light"
          ? {
              primary: blueGrey[900],
              secondary: blueGrey[800],
            }
          : {
              primary: "#fff",
              secondary: blueGrey[500],
            }),
      },
    },
  });

  const { toggleTheme } = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleTheme: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  body.style.backgroundColor = theme.palette.background.default;
  body.style.color = theme.palette.text.primary;

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
