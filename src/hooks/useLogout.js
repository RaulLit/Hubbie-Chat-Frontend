import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user & chats from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("chats");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
