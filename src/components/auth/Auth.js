import { Box, Container, Divider, Typography } from "@mui/material";
import { SignupForm } from "./SignupForm";
import { LoginForm } from "./LoginForm";

export const Auth = () => {
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
        <Typography variant="h3" color="primary">
          Hubbie Chat
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <LoginForm />
        <Divider orientation="vertical" variant="middle" flexItem color="black" />
        <SignupForm />
      </Box>
    </Container>
  );
};
