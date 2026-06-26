import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useAlert } from "./useAlert";
import axios from "axios";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const { setAlert } = useAlert();

  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  // Response interceptor
  client.interceptors.response.use(
    (response) => {
      // If the response is successful, just return it
      return response;
    },
    async (error) => {
      // Check for auth token expired
      if (
        (error.response && error.response.status === 401) ||
        error?.response?.data?.message === "Auth token expired"
      ) {
        await _logout();
        return Promise.reject({ message: "Auth token expired", status: 401 });
      }
      // For other errors, just return the original error
      return Promise.reject(error);
    }
  );

  // Logout for auth token expire
  const _logout = async () => {
    try {
      await client.get(`/api/auth/logout`);
    } catch (e) {
      console.log("Session logout request error:", e);
    }
    localStorage.removeItem("user");
    localStorage.removeItem("chats");
    dispatch({ type: "LOGOUT" });
    setAlert({ message: "Auth token expired. Login to continue", severity: "error" });
  };

  const request = async (url, { method = "GET", data = {}, params = {} } = {}) => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
      const response = await client({
        url,
        method,
        data,
        params,
      });
      const result = response.data;

      console.log("inside useFetch", result.data);

      setData(result.data);
      // set variables
      setData(result.data || null);
      return result;
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || "Something went wrong";
      setError(errMsg);
      setData(null);
      console.log("inside useFetch", err);
      return err.response ? err.response.data : { status: "error", message: errMsg };
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, request };
};
