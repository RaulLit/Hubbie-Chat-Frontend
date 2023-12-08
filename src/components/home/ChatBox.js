import { Box } from "@mui/material";
import { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { Chat } from "./Chat";

export const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useContext(ChatContext);

  return (
    <Box
      sx={{
        display: { xs: selectedChat ? "flex" : "none", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        p: 1.5,
        background: (t) => t.palette.background.paper,
        width: { sm: "100%", md: "60%" },
        borderRadius: "1rem",
        marginLeft: 0.5,
      }}
    >
      <Chat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};
