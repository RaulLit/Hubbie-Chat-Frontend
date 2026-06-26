"use client";

import { createContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { blue, deepOrange, blueGrey } from "@mui/material/colors";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme) {
      setMode(savedTheme);
    } else if (typeof window !== "undefined") {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setMode(prefersDarkMode ? "dark" : "light");
    }
  }, []);

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
        main: mode === "dark" ? deepOrange[300] : "#E64A19",
        light: mode === "dark" ? deepOrange[200] : deepOrange[400],
        dark: mode === "dark" ? deepOrange[500] : deepOrange[700],
        contrastText: "#fff",
      },
      secondary: {
        main: mode === "dark" ? blue[300] : "#1976D2",
        light: mode === "dark" ? blue[200] : blue[400],
        dark: mode === "dark" ? blue[500] : blue[700],
        contrastText: "#fff",
      },
      background: {
        default: mode === "dark" ? blueGrey[900] : "#E2E8F0",
        paper: mode === "dark" ? blueGrey[800] : "#F8FAFC",
      },
      text: {
        primary: mode === "dark" ? "#FFFFFF" : "#1F2937",
        secondary: mode === "dark" ? blueGrey[300] : "#4B5563",
      },
    },
  });

  const { toggleTheme } = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleTheme: () => {
        setMode((prevMode) => {
          const nextMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", nextMode);
          return nextMode;
        });
      },
    }),
    []
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const body = document.querySelector("body");
      if (body) {
        body.style.backgroundColor = theme.palette.background.default;
        body.style.color = theme.palette.text.primary;
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

