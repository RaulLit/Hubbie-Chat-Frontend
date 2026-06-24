import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    // remove user & chats from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("chats");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });

    // redirect to login page
    navigate("/auth");
  };

  return { logout };
};
