"use client";

import { useEffect, useState } from "react";
import { Box, Paper, CircularProgress, Typography, Slide } from "@mui/material";
import HubIcon from "@mui/icons-material/Hub";

const MESSAGES = [
  "Starting Server...",
  "Checking network...",
  "Making connection...",
  "Geeking out...",
  "Boarding bus...",
  "Travelling to you...",
  "Brewing fresh coffee...",
  "Waking up the database...",
  "Spinning up the dynos..."
];

export const ServerWakeUp = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let active = true;
    let textInterval;
    let pollInterval;

    const pingServer = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000"}/api/ping`
        );
        if (res.ok) {
          if (active) {
            setVisible(false);
            clearInterval(textInterval);
            clearInterval(pollInterval);
          }
        }
      } catch (err) {
        if (active && !visible) {
          setVisible(true);
        }
      }
    };

    // Initial check
    pingServer();

    // Rotator for status text
    textInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 3500);

    // Keep polling every 2.5 seconds
    pollInterval = setInterval(() => {
      pingServer();
    }, 2500);

    return () => {
      active = false;
      clearInterval(textInterval);
      clearInterval(pollInterval);
    };
  }, [visible]);

  return (
    <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
      <Paper
        elevation={6}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "16px 24px",
          borderRadius: "1.25rem",
          background: (t) =>
            t.palette.mode === "dark"
              ? "rgba(33, 43, 54, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: (t) =>
            t.palette.mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(0, 0, 0, 0.05)",
          boxShadow: (t) =>
            t.palette.mode === "dark"
              ? "0 10px 30px rgba(0,0,0,0.5)"
              : "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress size={36} thickness={4} color="primary" />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HubIcon sx={{ fontSize: "1.1rem", color: "primary.main" }} />
          </Box>
        </Box>
        <Box sx={{ minWidth: 170 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "bold",
              fontSize: "0.85rem",
            }}
          >
            {MESSAGES[msgIndex]}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Server warming up
          </Typography>
        </Box>
      </Paper>
    </Slide>
  );
};
