import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const logout = () => {
    // remove user & chats from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("chats");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });

    // redirect to login page
    router.push("/auth");
  };

  return { logout };
};
