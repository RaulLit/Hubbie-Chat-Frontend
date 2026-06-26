import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { SideDrawer } from "./SideDrawer";
import { MyChats } from "./MyChats";
import { ChatBox } from "./ChatBox";

export const Home = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useContext(AuthContext);
  return (
    <Box sx={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        sx={{
          width: "100%",
          height: "90vh",
          display: "flex",
          justifyContent: "space-between",
          padding: { xs: 0, sm: "1rem" },
        }}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </Box>
  );
};
