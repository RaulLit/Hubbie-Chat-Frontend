import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/navigation";
import { useFetch } from "./useFetch";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const { request, error, loading } = useFetch();

  const login = async (email, password) => {
    try {
      const result = await request("/api/auth/login", {
        method: "POST",
        data: JSON.stringify({ email, password }),
      });

      if (result && result.status === "error") throw Error(result.message);

      if (result && result.status === "success") {
        // save user to local storage
        localStorage.setItem("user", JSON.stringify(result.data));

        // update the auth context
        dispatch({ type: "LOGIN", payload: result.data });
        router.push("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { login, loading, error };
};
