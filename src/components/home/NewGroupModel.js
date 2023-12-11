import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  Input,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useAlert } from "../../hooks/useAlert";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { useSearch } from "../../hooks/useSearch";
import { UserCard } from "./UserCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "30rem" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const NewGroupModel = ({ open, handleOpen, handleClose, children }) => {
  const { user } = useContext(AuthContext);
  const { chats, setChats } = useContext(ChatContext);
  const { isLoading, SearchUser, error } = useSearch();
  const isSmallScreen = useMediaQuery("(max-width: 360px)");

  // new group form
  const [groupName, setGroupName] = useState();
  const [groupUsers, setGroupUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const { alertElem, setAlert, showAlert } = useAlert();

  const handleSearch = async (query) => {
    if (!query) {
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

  const handleGroup = (new_user) => {
    if (groupUsers.includes(new_user)) {
      // Alert
      setAlert({
        message: "User already added",
        alert: {
          variant: "filled",
          severity: "info",
        },
        snackbar: {
          autoHideDuration: 3000,
        },
      });
      showAlert();
      return;
    }
    setGroupUsers([...groupUsers, new_user]);
  };

  const handleDelete = (del_user) => {
    setGroupUsers(groupUsers.filter((sel) => sel._id !== del_user._id));
  };

  const handleSubmit = async () => {
    if (groupUsers.length === 0 || !groupName) {
      // Alert
      setAlert({
        message: "Please fill all the fields",
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
    const requestData = {
      name: groupName,
      users: JSON.stringify(groupUsers.map((u) => u._id)),
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/chat/group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw Error(data.error);
      }

      const data = await response.json();
      setChats([data, ...chats]);
      handleClose();
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

  return (
    <>
      {children ? (
        <span>{children}</span>
      ) : (
        <IconButton onClick={handleOpen}>
          <Add />
        </IconButton>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" align="center">
            {isSmallScreen ? "Create New Group" : "Create new Group Chat"}
          </Typography>
          <Divider sx={{ m: "1rem 0" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <FormControl
              fullWidth
              sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <Input
                placeholder="Group Name"
                onChange={(e) => setGroupName(e.target.value)}
                sx={{ width: "70%", mb: 2 }}
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
            {/* Show selected users */}
            <Stack direction="row" spacing={1}>
              {groupUsers.map((user) => (
                <Chip
                  key={user._id}
                  label={user.name}
                  variant="outlined"
                  color="primary"
                  onDelete={() => handleDelete(user)}
                  onClick={() => handleDelete(user)}
                />
              ))}
            </Stack>
            {/* Show searched results */}
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Stack sx={{ width: "100%", alignItems: "center", margin: 1 }}>
                {searchResults.slice(0, 4).map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    handleFunc={() => handleGroup(user)}
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
                type="submit"
                onClick={handleSubmit}
                sx={{ margin: "0 0.5rem 0 0" }}
              >
                Create
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
