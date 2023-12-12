import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (data) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/user/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const json = await response.json();
      if (!response.ok) {
        throw Error(json.error);
      }

      if (response.ok) {
        // save user to local storage
        localStorage.setItem("user", JSON.stringify(json));

        // update the auth context
        dispatch({ type: "LOGIN", payload: json });
        navigate("/home");
      }
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error, setError };
};
