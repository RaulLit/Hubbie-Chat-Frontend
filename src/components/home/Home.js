import { Box } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { SideDrawer } from "./SideDrawer";
import { MyChats } from "./MyChats";
import { ChatBox } from "./ChatBox";

export const Home = () => {
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
          padding: "1rem",
        }}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </Box>
  );
};
