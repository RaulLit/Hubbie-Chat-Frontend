import { Box, IconButton, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { ArrowBack } from "@mui/icons-material";
import { UpdateGroupModel } from "./UpdateGroupModel";
import { getSender, getSenderObj } from "../../util/Utilities";
import { AuthContext } from "../../contexts/AuthContext";
import { ProfileModel } from "./ProfileModel";

export const Chat = ({ fetchAgain, setFetchAgain }) => {
  const { user } = useContext(AuthContext);
  const { selectedChat, setSelectedChat } = useContext(ChatContext);

  // Update Group Chat Model
  const [openModel, setOpenModel] = useState(false);
  const handleOpenModel = () => setOpenModel(true);
  const handleCloseModel = () => setOpenModel(false);

  // Profile Model
  const [openProfileModel, setOpenProfileModel] = useState(false);
  const handleOpenProfileModel = () => setOpenProfileModel(true);
  const handleCloseProfileModel = () => setOpenProfileModel(false);

  return (
    <>
      {selectedChat ? (
        <>
          <Typography
            sx={{
              typography: { xs: "h6", sm: "h5" },
              padding: 1,
              width: "100%",
              display: "flex",
              justifyContent: { sm: "space-between" },
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
            }}
          >
            {/* Messages */}
          </Box>
        </>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Typography variant="h4" color="primary">
            Click on a chat to start texting
          </Typography>
        </Box>
      )}
    </>
  );
};
