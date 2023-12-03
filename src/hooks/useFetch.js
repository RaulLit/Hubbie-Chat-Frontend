import { useState } from "react";
import { useLogout } from "./useLogout";

export const useFetch = (url, options) => {
  const method = options.method || "GET";
  const headers = options.headers || { "Content-Type": "application/json" };
  const body = options.body || undefined;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { logout } = useLogout();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method,
        headers,
        body,
      });
      const result = await response.json();
      // Check for auth token expire
      if (
        result.status &&
        result.status === "error" &&
        result.message &&
        result.message === "Auth token expired"
      ) {
        setLoading(false);
        setData(null);
        logout();
        return null;
      }
      setLoading(false);
      setData(result);
      return result;
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };
  return { data, loading, error, fetchData };
};
