import { Box, Button, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { useAlert } from "../../hooks/useAlert";
import { ChatLoading } from "./ChatLoading";
import { getSender } from "../../util/Utilities";
import { NewGroupModel } from "./NewGroupModel";

export const MyChats = ({ fetchAgain }) => {
  const { user } = useContext(AuthContext);
  const { setAlert, alertElem, showAlert } = useAlert();
  const { selectedChat, setSelectedChat, chats, setChats } = useContext(ChatContext);

  // NewGroup Model
  const [openModel, setOpenModel] = useState(false);
  const handleOpenModel = () => setOpenModel(true);
  const handleCloseModel = () => setOpenModel(false);

  const getChats = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/chat/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const fetched_chats = await response.json();
      setChats(fetched_chats);
    } catch (err) {
      // Alert
      setAlert({
        message: err.message,
        alert: {
          variant: "filled",
          severity: "error",
        },
        snackbar: {
          autoHideDuration: 6000,
        },
      });
      showAlert();
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
        width: { sm: "100%", md: "40%" },
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
        <Typography variant="h5">My Chats</Typography>
        <NewGroupModel
          open={openModel}
          handleOpen={handleOpenModel}
          handleClose={handleCloseModel}
        >
          <Button onClick={handleOpenModel} sx={{ textTransform: "none" }}>
            New Group Chat
          </Button>
        </NewGroupModel>
      </Box>
      <Box
        sx={{
          diplay: "flex",
          flexDirection: "column",
          padding: 1,
          background: (t) => t.palette.background.default,
          width: "100%",
          height: "100%",
          borderRadius: "1rem",
          overflowY: "hidden",
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
                <Typography>
                  {!c.isGroupChat ? getSender(user, c.users) : c.chatName}
                </Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
      {alertElem}
    </Box>
  );
};
