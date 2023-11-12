import { Box, Button, Typography, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const Intro = () => {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <Box sx={{ height: "100%", width: "100%", marginTop: 5, textAlign: "center" }}>
      <Box
        sx={{
          height: "60vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3">Text with your friends anytime you want!!</Typography>
        <Typography variant="h4" sx={{ margin: "1rem 0" }}>
          Register to start now!
        </Typography>
        <Button
          variant={mode == "dark" ? "outlined" : "contained"}
          onClick={() => navigate("/auth")}
          sx={{}}
        >
          Get Started
        </Button>
        <Box sx={{ marginTop: "5rem" }}>
          <Typography>What to change the theme?</Typography>
          <Switch checked={mode === "dark" ? true : false} onChange={toggleTheme} />
        </Box>
      </Box>
    </Box>
  );
};
