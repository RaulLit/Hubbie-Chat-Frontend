import { Box, Container, Divider, Typography, useMediaQuery } from "@mui/material";
import { SignupForm } from "./SignupForm";
import { LoginForm } from "./LoginForm";

export const Auth = () => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: (theme) => theme.spacing(5),
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box p={2}>
        <Typography
          variant="h3"
          sx={{ typography: { xs: "h4", sm: "h3" } }}
          color="primary"
        >
          Hubbie Chat
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          margin: { xs: "0 1.5rem", sm: 0 },
        }}
      >
        <LoginForm />
        <Divider
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          variant="middle"
          flexItem
          color="black"
        />
        <SignupForm />
      </Box>
    </Container>
  );
};
