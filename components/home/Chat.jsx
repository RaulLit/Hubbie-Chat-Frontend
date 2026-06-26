import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isDifferentDay, formatDatePill } from "../../util/Utilities";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";

export const Chat = ({ messages }) => {
  const { user } = useContext(AuthContext);
  const { selectedChat } = useContext(ChatContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
      }}
      className="noScrollbar"
    >
      <ScrollableFeed>
        {messages &&
          messages.map((m, i) => {
            const showDatePill = i === 0 || isDifferentDay(messages[i - 1], m);
            
            // Checkmark status logic
            let isRead = false;
            let isDelivered = false; // Double grey checks for group chats read by at least one member

            if (m.sender.id === user.id) {
              const readByOthers = (m.readBy || []).filter(
                (uid) => (uid.id || uid).toString() !== user.id.toString()
              );
              
              if (selectedChat?.isGroupChat) {
                const totalParticipants = selectedChat.users.length;
                if (readByOthers.length === totalParticipants - 1) {
                  isRead = true;
                } else if (readByOthers.length > 0) {
                  isDelivered = true;
                }
              } else {
                if (readByOthers.length > 0) {
                  isRead = true;
                }
              }
            }

            return (
              <Box key={m.id || `msg-${i}`} sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                {showDatePill && (
                  <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem 0", width: "100%" }}>
                    <Box
                      sx={{
                        background: (t) => t.palette.action.disabledBackground,
                        color: (t) => t.palette.text.secondary,
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        padding: "4px 12px",
                        borderRadius: "1rem",
                        userSelect: "none",
                      }}
                    >
                      {formatDatePill(m.createdAt)}
                    </Box>
                  </Box>
                )}
                
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: m.sender.id === user.id ? "flex-end" : "flex-start",
                    margin: "0.15rem 0",
                  }}
                >
                  {m.sender.id !== user.id &&
                    (isSameSender(messages, m, i, user.id) ||
                      isLastMessage(messages, i, user.id)) && (
                      <Tooltip title={m.sender.name} placement="bottom-start" arrow>
                        <Avatar
                          sx={{
                            width: "1.75rem",
                            height: "1.75rem",
                            fontSize: "0.8rem",
                            marginRight: 1,
                          }}
                          alt={m.sender.name}
                        >
                          {m.sender.name[0]}
                        </Avatar>
                      </Tooltip>
                    )}
                  
                  <Box
                    sx={{
                      background:
                        m.sender.id === user.id
                          ? (t) => t.palette.primary.main
                          : (t) => (t.palette.mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "#FFFFFF"),
                      color:
                        m.sender.id === user.id
                          ? (t) => t.palette.primary.contrastText
                          : (t) => (t.palette.mode === "dark" ? "#ffffff" : "#1F2937"),
                      borderRadius: "1rem",
                      padding: "0.5rem 1rem",
                      maxWidth: "70%",
                      marginLeft:
                        m.sender.id === user.id
                          ? "auto"
                          : isSameSender(messages, m, i, user.id) ||
                            isLastMessage(messages, i, user.id)
                          ? 0
                          : "2.25rem",
                      boxShadow: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        alignSelf: "flex-start",
                        wordBreak: "break-word",
                        fontSize: "0.95rem",
                        textAlign: "left",
                      }}
                    >
                      {m.content}
                    </Typography>
                    
                    <Box sx={{ display: "flex", alignItems: "center", marginTop: "0.2rem", gap: 0.5 }}>
                      <Typography
                        sx={{
                          fontSize: "0.65rem",
                          opacity: 0.7,
                          userSelect: "none",
                        }}
                      >
                        {new Date(m.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                      
                      {m.sender.id === user.id && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {m.status === "pending" ? (
                            <AccessTimeIcon sx={{ fontSize: "0.75rem", opacity: 0.7 }} />
                          ) : isRead ? (
                            <DoneAllIcon sx={{ fontSize: "0.85rem", color: "#34B7F1" }} />
                          ) : isDelivered ? (
                            <DoneAllIcon sx={{ fontSize: "0.85rem", opacity: 0.7 }} />
                          ) : (
                            <DoneIcon sx={{ fontSize: "0.85rem", opacity: 0.7 }} />
                          )}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
      </ScrollableFeed>
    </Box>
  );
};
