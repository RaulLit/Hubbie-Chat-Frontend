import { Container, Divider } from "@mui/material";
import { SignupForm } from "./SignupForm";
import { LoginForm } from "./LoginForm";

export const Auth = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: (theme) => theme.spacing(10),
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <LoginForm />
      <Divider orientation="vertical" variant="middle" flexItem color="black" />
      <SignupForm />
    </Container>
  );
};
