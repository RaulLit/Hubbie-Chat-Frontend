import { Box, Container, Divider, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Contacts } from "./Contacts";

export const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <Box
      sx={{
        width: { sm: "100%", lg: "90%" },
        height: { sm: "100vh", lg: "90vh" },
        position: "absolute",
        top: { sm: 0, lg: "5vh" },
        left: { sm: 0, lg: "5%" },
        background: (t) => t.palette.background.paper,
        display: "flex",
      }}
    >
      <Contacts />
      <Divider orientation="vertical" variant="fullWidth" flexItem color="white" />
      <Box>HI</Box>
    </Box>
  );
};
