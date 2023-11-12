import { Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { useLogout } from "../hooks/useLogout";

export const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const handleSignOut = () => {
    logout();
    navigate("/auth");
  };
  return (
    <Container>
      {user && (
        <Button sx={{ position: "absolute", top: 0, right: 10 }} onClick={handleSignOut}>
          Log Out
        </Button>
      )}
      {children}
    </Container>
  );
};
