import { Done, Groups } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { useSearch } from "../../hooks/useSearch";
import { useAlert } from "../../hooks/useAlert";
import { UserCard } from "./UserCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "30rem" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: { xs: 2, sm: 4 },
};

export const UpdateGroupModel = ({
  open,
  handleOpen,
  handleClose,
  fetchAgain,
  setFetchAgain,
}) => {
  const { user } = useContext(AuthContext);
  const { selectedChat, setSelectedChat } = useContext(ChatContext);
  const { isLoading, SearchUser, error } = useSearch();
  const { alertElem, setAlert, showAlert } = useAlert();

  // update group form
  const [groupName, setGroupName] = useState(selectedChat.chatName);
  const [searchResults, setSearchResults] = useState([]);
  const [renameLoading, setRenameLoading] = useState(false);
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [removeUserLoading, setRemoveUserLoading] = useState(false);
  const [leaveGroupLoading, setLeaveGroupLoading] = useState(false);

  const handleRemove = async (selected_user) => {
    if (selected_user.id === user.id) {
      setAlert({
        message: "You cannot remove yourself from here. Use leave group",
        alert: {
          variant: "filled",
          severity: "warning",
        },
        snackbar: {
          autoHideDuration: 6000,
        },
      });
      showAlert();
      return;
    }

    if (selectedChat.groupAdmin.id !== user.id) {
      setAlert({
        message: "Only group admin can remove members",
        alert: {
          variant: "filled",
          severity: "warning",
        },
        snackbar: {
          autoHideDuration: 6000,
        },
      });
      showAlert();
      return;
    }
    try {
      setRemoveUserLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/group/remove`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ chatId: selectedChat.id, userId: selected_user.id }),
          credentials: "include",
        }
      );
      const data = await response.json();
      // Check response
      if (!response.ok) {
        throw Error(data.error);
      }
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRemoveUserLoading(false);
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
      setRemoveUserLoading(false);
    }
  };

  const handleChangeGroupName = async () => {
    if (!groupName || groupName === selectedChat.chatName) return;
    try {
      setRenameLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/group/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ chatId: selectedChat.id, chatName: groupName }),
          credentials: "include",
        }
      );
      const data = await response.json();

      // Check if response ok
      if (!response.ok) {
        throw Error(data.error);
      }

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
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
      setRenameLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    // Search users
    setSearchResults(await SearchUser(query));
    if (error) {
      // Alert
      setAlert({
        message: "Failed to load search results",
        alert: {
          variant: "filled",
          severity: "warning",
        },
        snackbar: {
          autoHideDuration: 6000,
        },
      });
      showAlert();
    }
  };

  const handleAddUser = async (new_user) => {
    // Check if user already exists
    if (selectedChat.users.find((u) => u.id === new_user.id)) {
      setAlert({
        message: "User already in group",
        alert: {
          variant: "filled",
          severity: "warning",
        },
        snackbar: {
          autoHideDuration: 6000,
        },
      });
      showAlert();
      return;
    }
    if (selectedChat.groupAdmin.id !== user.id) {
      setAlert({
        message: "Only group admin can add members",
        alert: {
          variant: "filled",
          severity: "warning",
        },
        snackbar: {
          autoHideDuration: 6000,
        },
      });
      showAlert();
      return;
    }
    try {
      setAddUserLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/group/add`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ chatId: selectedChat.id, userId: new_user.id }),
          credentials: "include",
        }
      );
      const data = await response.json();
      // Response Check
      if (!response.ok) {
        throw Error(data.error);
      }
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setAddUserLoading(false);
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
      setAddUserLoading(false);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      setLeaveGroupLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/group/remove`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ chatId: selectedChat.id, userId: user.id }),
          credentials: "include",
        }
      );
      const data = await response.json();
      // Check response
      if (!response.ok) throw Error(data.error);
      setSelectedChat();
      setFetchAgain(!fetchAgain);
      setLeaveGroupLoading(false);
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
      setLeaveGroupLoading(false);
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Groups />
      </IconButton>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" align="center">
            {selectedChat.chatName}
          </Typography>
          <Divider sx={{ m: "1rem 0" }} />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Stack direction="row" spacing={1} position="relative" flexWrap={"wrap"}>
              {selectedChat &&
                selectedChat.users.map((user) => (
                  <Chip
                    key={user.id}
                    label={user.name}
                    variant="outlined"
                    color="primary"
                    onDelete={() => handleRemove(user)}
                    onClick={() => handleRemove(user)}
                  />
                ))}
              {/* Spinner */}
              {removeUserLoading && <CircularProgress size="1.5rem" />}
            </Stack>
            <FormControl
              fullWidth
              sx={{
                margin: "1rem 0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Input
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                sx={{ width: "70%", mb: 2 }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ position: "relative" }}
                      onClick={handleChangeGroupName}
                      disabled={renameLoading}
                    >
                      {!renameLoading ? (
                        <Done />
                      ) : (
                        <CircularProgress
                          size="1.5rem"
                          sx={{ position: "absolute", right: 0 }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              fullWidth
              sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <Input
                placeholder="Add user"
                onChange={(e) => handleSearch(e.target.value)}
                sx={{ width: "70%", mb: 1 }}
              />
            </FormControl>

            {/* Show searched results */}
            {isLoading || addUserLoading ? (
              <CircularProgress />
            ) : (
              <Stack sx={{ width: "100%", alignItems: "center", margin: 1 }}>
                {searchResults.slice(0, 4).map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    handleFunc={() => handleAddUser(user)}
                  />
                ))}
              </Stack>
            )}

            <Divider />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                disabled={leaveGroupLoading}
                onClick={handleLeaveGroup}
                sx={{ margin: "0 0.5rem 0 0" }}
              >
                Leave Group
              </Button>
              <Button onClick={handleClose} sx={{ margin: "0 0 0 0.5rem" }}>
                Close
              </Button>
            </Box>
          </Box>
          {alertElem}
        </Box>
      </Modal>
    </>
  );
};
