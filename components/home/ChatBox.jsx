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
import { io } from "socket.io-client";
import { TypingIndicator } from "./TypingIndicator";
var socket, compareSelectedChat;

export const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { user } = useContext(AuthContext);
  const { selectedChat, setSelectedChat, notification, setNotification } =
    useContext(ChatContext);
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

  // socket
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setMessageLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/message/${selectedChat.id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) throw Error(data.error);
      setMessages(data);
      setMessageLoading(false);
      socket.emit("join_chat", selectedChat.id);

      // Update read status in database
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/message/read`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ chatId: selectedChat.id }),
        credentials: "include",
      });

      // Notify others in room
      socket.emit("read_receipt", {
        chatId: selectedChat.id,
        readerId: user.id,
      });
    } catch (err) {
      setAlert({
        message: err.message,
        alert: { variant: "filled", severity: "error" },
        snackbar: { autoHideDuration: 3000 },
      });
      showAlert();
      setMessageLoading(false);
    }
  };

  let myTimeout;
  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat.id);
    }
    if (myTimeout) clearTimeout(myTimeout);

    myTimeout = setTimeout(() => {
      if (typing) {
        socket.emit("typing_stopped", selectedChat.id);
        setTyping(false);
      }
    }, 3000);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    const messageContent = newMessage;
    setNewMessage("");

    // Generate optimistic tempId
    const tempId = `temp-${Date.now()}`;
    const tempMsg = {
      id: tempId,
      sender: { id: user.id, name: user.name },
      content: messageContent,
      chat: selectedChat.id,
      createdAt: new Date().toISOString(),
      readBy: [user.id],
      status: "pending",
    };

    // Optimistically add message
    setMessages((prev) => [...prev, tempMsg]);

    try {
      socket.emit("typing_stopped", selectedChat.id);
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/message/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ chatId: selectedChat.id, content: messageContent }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw Error(data.error);

      // Update temporary message with official database message (defaults to status: "sent")
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...data, status: "sent" } : m))
      );

      socket.emit("new_msg", data);
    } catch (err) {
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((m) => m.id !== tempId));

      setAlert({
        message: err.message,
        alert: { variant: "filled", severity: "error" },
        snackbar: { autoHideDuration: 3000 },
      });
      showAlert();
    }
  };

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_SERVER_URL);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!socketConnected) return;

    const handleMsgRxd = async (rx_msg) => {
      if (!compareSelectedChat || compareSelectedChat.id !== rx_msg.chat.id) {
        if (!notification.some((n) => n.id === rx_msg.id)) {
          setNotification([rx_msg, ...notification]);
        }
      } else {
        // Mark as read in DB immediately since chat is active
        try {
          const updatedMsg = { ...rx_msg, readBy: [...(rx_msg.readBy || []), user.id] };
          setMessages((prev) => [...prev, updatedMsg]);

          await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/message/read`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ chatId: rx_msg.chat.id }),
            credentials: "include",
          });

          // Notify sender
          socket.emit("read_receipt", {
            chatId: rx_msg.chat.id,
            messageId: rx_msg.id,
            readerId: user.id,
          });
        } catch (err) {
          console.error("Error marking received message as read:", err);
        }
        setFetchAgain((prev) => !prev);
      }
    };

    const handleMessageRead = (data) => {
      setMessages((prevMessages) =>
        prevMessages.map((m) => {
          if (data.messageId) {
            if (m.id === data.messageId) {
              const readSet = new Set(m.readBy || []);
              readSet.add(data.readerId);
              return { ...m, readBy: Array.from(readSet) };
            }
          } else {
            if (m.sender.id === user.id) {
              const readSet = new Set(m.readBy || []);
              readSet.add(data.readerId);
              return { ...m, readBy: Array.from(readSet) };
            }
          }
          return m;
        })
      );
    };

    socket.on("msg_rxd", handleMsgRxd);
    socket.on("message_read", handleMessageRead);
    socket.on("typing", () => setIsTyping(true));
    socket.on("typing_stopped", () => setIsTyping(false));

    return () => {
      socket.off("msg_rxd", handleMsgRxd);
      socket.off("message_read", handleMessageRead);
      socket.off("typing");
      socket.off("typing_stopped");
    };
  }, [socketConnected, notification, messages, user, fetchAgain, setFetchAgain, setNotification]);

  useEffect(() => {
    fetchMessages();
    compareSelectedChat = selectedChat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  return (
    <Box
      sx={{
        display: { xs: selectedChat ? "flex" : "none", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        p: 1.5,
        background: (t) => t.palette.background.paper,
        width: { xs: "100%", md: "70%" },
        borderRadius: "1rem",
        marginLeft: { xs: 0, md: 0.5 },
        boxShadow: (t) =>
          t.palette.mode === "light"
            ? "0 4px 20px -2px rgba(0,0,0,0.05), 0 2px 8px -1px rgba(0,0,0,0.05)"
            : "none",
        border: (t) =>
          t.palette.mode === "light"
            ? "1px solid rgba(0,0,0,0.04)"
            : "1px solid rgba(255,255,255,0.05)",
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
            {/* Input */}
            {isTyping && <TypingIndicator />}
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
