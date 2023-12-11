import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { AuthContext } from "../../contexts/AuthContext";
import { ArrowBack, Send } from "@mui/icons-material";
import { UpdateGroupModel } from "./UpdateGroupModel";
import { getSender, getSenderObj } from "../../util/Utilities";
import { ProfileModel } from "./ProfileModel";
import { Chat } from "./Chat";
import { useAlert } from "../../hooks/useAlert";

export const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { user } = useContext(AuthContext);
  const { selectedChat, setSelectedChat } = useContext(ChatContext);
  const { alertElem, setAlert, showAlert } = useAlert();

  // Update Group Chat Model
  const [openModel, setOpenModel] = useState(false);
  const handleOpenModel = () => setOpenModel(true);
  const handleCloseModel = () => setOpenModel(false);

  // Profile Model
  const [openProfileModel, setOpenProfileModel] = useState(false);
  const handleOpenProfileModel = () => setOpenProfileModel(true);
  const handleCloseProfileModel = () => setOpenProfileModel(false);

  // Chat Box
  const [messageLoading, setMessageLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setMessageLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/message/${selectedChat._id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      const data = await response.json();
      // Check Response
      if (!response.ok) throw Error(data.error);
      setMessages(data);
      setMessageLoading(false);
    } catch (err) {
      // Alert
      setAlert({
        message: err.message,
        alert: {
          variant: "filled",
          severity: "error",
        },
        snackbar: {
          autoHideDuration: 3000,
        },
      });
      showAlert();
      setMessageLoading(false);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const messageData = newMessage;
      setNewMessage("");
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/message/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ chatId: selectedChat._id, content: messageData }),
      });
      const data = await response.json();
      // Response Check
      if (!response.ok) throw Error(data.error);
      setMessages([...messages, data]);
    } catch (err) {
      // Alert
      setAlert({
        message: err.message,
        alert: {
          variant: "filled",
          severity: "error",
        },
        snackbar: {
          autoHideDuration: 3000,
        },
      });
      showAlert();
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  return (
    <Box
      sx={{
        display: { xs: selectedChat ? "flex" : "none", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        p: 1.5,
        background: (t) => t.palette.background.paper,
        width: { xs: "100%", md: "60%" },
        borderRadius: "1rem",
        marginLeft: { xs: 0, md: 0.5 },
      }}
    >
      {selectedChat ? (
        <>
          {/* Header (Chat Info) */}
          <Typography
            sx={{
              typography: { xs: "h6", sm: "h5" },
              padding: 1,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{ display: { sm: "flex", md: "none" } }}
              onClick={() => setSelectedChat("")}
            >
              <ArrowBack />
            </IconButton>
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModel
                  open={openProfileModel}
                  handleOpen={handleOpenProfileModel}
                  handleClose={handleCloseProfileModel}
                  user={getSenderObj(user, selectedChat.users)}
                />
              </>
            ) : (
              <>
                {selectedChat.chatName}
                <UpdateGroupModel
                  open={openModel}
                  handleOpen={handleOpenModel}
                  handleClose={handleCloseModel}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                ></UpdateGroupModel>
              </>
            )}
          </Typography>
          {/* Main body */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: 1,
              width: "100%",
              height: "100%",
              background: (t) => t.palette.background.default,
              borderRadius: "1rem",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {messageLoading ? (
              <CircularProgress sx={{ position: "absolute", top: "50%", right: "50%" }} />
            ) : (
              <Chat messages={messages} />
            )}
            <FormControl fullWidth sx={{ display: "flex", flexDirection: "row" }}>
              <OutlinedInput
                placeholder="Type a message"
                fullWidth
                value={newMessage}
                onChange={handleTyping}
                onKeyDown={(e) => e.key === "Enter" && newMessage && handleSendMessage()}
                sx={{ borderRadius: "1rem" }}
              />
              <IconButton
                onClick={handleSendMessage}
                sx={{ "&:hover": { background: "none" } }}
              >
                <Send />
              </IconButton>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Typography
            variant="h4"
            color="primary"
            sx={{
              "@media screen and (max-width: 975px)": {
                typography: "h5",
              },
            }}
          >
            Click on a chat to start texting
          </Typography>
        </Box>
      )}
      {alertElem}
    </Box>
  );
};
