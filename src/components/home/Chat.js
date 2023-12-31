import { Avatar, Box, Chip, Tooltip } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../../util/Utilities";

export const Chat = ({ messages }) => {
  const { user } = useContext(AuthContext);

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
          messages.map((m, i) => (
            <Box key={m._id} sx={{ display: "flex", alignItems: "center" }}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip title={m.sender.name} placement="bottom-start" arrow>
                  <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} alt={m.sender.name}>
                    {m.sender.name[0]}
                  </Avatar>
                </Tooltip>
              )}
              <Chip
                label={m.content}
                sx={{
                  height: "auto",
                  padding: "0.5rem 0.2rem",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                  background:
                    m.sender._id === user._id
                      ? (t) => t.palette.primary.main
                      : (t) => t.palette.secondary.main,
                  maxWidth: "70%",
                  margin: "0.1rem 0",
                  marginLeft:
                    m.sender._id === user._id
                      ? "auto"
                      : isSameSender(messages, m, i, user._id) ||
                        isLastMessage(messages, i, user._id)
                      ? "0.1rem"
                      : "1.5rem",
                }}
              />
            </Box>
          ))}
      </ScrollableFeed>
    </Box>
  );
};
