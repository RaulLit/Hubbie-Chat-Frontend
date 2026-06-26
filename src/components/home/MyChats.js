import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { useAlert } from "../../hooks/useAlert";
import { ChatLoading } from "./ChatLoading";
import { getSender, formatChatTime } from "../../util/Utilities";
import { NewGroupModel } from "./NewGroupModel";
import { useFetch } from "../../hooks/useFetch";

export const MyChats = ({ fetchAgain }) => {
  const { user } = useContext(AuthContext);
  const { request } = useFetch();
  const { setAlert, alertElem } = useAlert();
  const { selectedChat, setSelectedChat, chats, setChats } = useContext(ChatContext);

  // NewGroup Model
  const [openModel, setOpenModel] = useState(false);
  const handleOpenModel = () => setOpenModel(true);
  const handleCloseModel = () => setOpenModel(false);
  const isScreenSmall = useMediaQuery("(max-width: 425px)");

  const getChats = async () => {
    try {
      const json = await request("/api/chat/");
      if (Array.isArray(json)) {
        setChats(json);
        localStorage.setItem("chats", JSON.stringify(json));
      } else if (json && json.status === "success" && Array.isArray(json.data)) {
        setChats(json.data);
        localStorage.setItem("chats", JSON.stringify(json.data));
      } else if (json && (json.error || json.message)) {
        throw new Error(json.error || json.message);
      }
    } catch (err) {
      // Alert
      setAlert({
        message: err.message,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    getChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      sx={{
        display: { xs: selectedChat ? "none" : "flex", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        p: 1.5,
        background: (t) => t.palette.background.paper,
        width: { xs: "100%", md: "30%" },
        borderRadius: "1rem",
      }}
    >
      <Box
        sx={{
          padding: 1,
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ typography: { xs: "h6", sm: "h5" } }}>My Chats</Typography>
        <NewGroupModel
          open={openModel}
          handleOpen={handleOpenModel}
          handleClose={handleCloseModel}
        >
          <Button onClick={handleOpenModel} sx={{ textTransform: "none" }}>
            {isScreenSmall ? "New Group" : "New Group Chat"}
          </Button>
        </NewGroupModel>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
          background: (t) => t.palette.background.default,
          width: "100%",
          height: "100%",
          borderRadius: "1rem",
          overflowY: "auto",
        }}
      >
        {chats && chats.length > 0 ? (
          <Stack spacing={1}>
            {chats.map((c) => (
              <Box
                key={c._id}
                onClick={() => setSelectedChat(c)}
                sx={{
                  cursor: "pointer",
                  background:
                    selectedChat === c
                      ? (t) => t.palette.background.paper
                      : (t) => t.palette.background.default,
                  padding: 2,
                  borderRadius: "1rem",
                  "&:hover": {
                    background: (t) => t.palette.action.hover,
                  },
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "0.95rem" }}>
                      {!c.isGroupChat ? getSender(user, c.users) : c.chatName}
                    </Typography>
                    {c.latestMessage && (
                      <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                        {formatChatTime(c.latestMessage.createdAt)}
                      </Typography>
                    )}
                  </Box>
                  {c.latestMessage && (
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: "text.secondary",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginTop: 0.5,
                        textAlign: "left",
                      }}
                    >
                      {c.latestMessage.sender._id === user._id ? "You: " : c.isGroupChat ? `${c.latestMessage.sender.name}: ` : ""}
                      {c.latestMessage.content}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          chats.length !== 0 && <ChatLoading />
        )}
      </Box>
      {alertElem}
    </Box>
  );
};
