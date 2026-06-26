import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/navigation";
import { useFetch } from "./useFetch";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const { request, loading, error } = useFetch();

  const signup = async (data) => {
    try {
      const result = await request("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data),
      });

      if (result.status && result.status === "error") throw Error(result.message);

      if (result.status && result.status === "success") {
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

  return { signup, loading, error };
};
