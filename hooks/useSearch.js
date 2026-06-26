import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useSearch = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const SearchUser = async (search) => {
    setIsLoading(true);
    setError(null);
    try {
      const fetched_users = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/allUser?search=${search}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
          credentials: "include",
        }
      );
      const resData = await fetched_users.json();
      setIsLoading(false);
      
      if (!fetched_users.ok) {
        throw new Error(resData.message || resData.error || "Failed to search user");
      }
      
      return Array.isArray(resData) ? resData : (resData.data || []);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      return [];
    }
  };

  return { isLoading, error, SearchUser };
};
