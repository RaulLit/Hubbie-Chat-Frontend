import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useSearch = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const SearchUser = async (search) => {
    setIsLoading(true);
    try {
      const fetched_users = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/user/allUser?search=${search}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const users = await fetched_users.json();
      setIsLoading(false);
      return users;
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return { isLoading, error, SearchUser };
};
