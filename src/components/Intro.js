import { Box, Button, Typography, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const Intro = () => {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        marginTop: { xs: 5, md: 10 },
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography
        marginLeft={2}
        marginRight={2}
        sx={{ typography: { xs: "h4", sm: "h3" } }}
      >
        Text with your friends anytime you want!!
      </Typography>
      <Typography sx={{ margin: "1rem 0", typography: { xs: "h5", sm: "h4" } }}>
        Register to start now!
      </Typography>
      <Button
        variant={mode === "dark" ? "outlined" : "contained"}
        onClick={() => navigate("/auth")}
        sx={{}}
      >
        Get Started
      </Button>
      <Box sx={{ marginTop: { xs: "3rem", sm: "5rem" } }}>
        <Typography>What to change the theme?</Typography>
        <Switch checked={mode === "dark" ? true : false} onChange={toggleTheme} />
      </Box>
    </Box>
  );
};
