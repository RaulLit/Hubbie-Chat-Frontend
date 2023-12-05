import { Search, Notifications } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useLogout } from "../../hooks/useLogout";
import { ProfileModel } from "./ProfileModel";
import { useAlert } from "../../hooks/useAlert";
import { ChatLoading } from "./ChatLoading";
import { UserCard } from "./UserCard";
import { ChatContext } from "../../contexts/ChatContext";
import { useSearch } from "../../hooks/useSearch";

export const SideDrawer = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useLogout();
  const { setAlert, alertElem, showAlert } = useAlert();
  const { setSelectedChat, notification, setNotification, chats, setChats } =
    useContext(ChatContext);

  // Search
  const { isLoading, SearchUser, error } = useSearch();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(null);
  const handleSearch = async () => {
    if (!search) {
      // Alert
      setAlert({
        message: "Please enter something in search",
        alert: {
          variant: "filled",
          severity: "warning",
        },
        snackbar: {
          autoHideDuration: 6000,
        },
      });
      showAlert(); // shows the popup alert
    }
    // Search users
    setUsers(await SearchUser(search));
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

  // Access Chat
  const accessChat = async (userId) => {
    try {
      // setLoadingChat(true);

      const data = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      // setLoadingChat(false);
      handleDrawerClose();
    } catch (error) {
      // Alert
      setAlert({
        message: "Error Fetching the chat",
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

  // Profile Menu
  const [profileAnchor, setProfileAnchor] = useState(null);
  const closeProfileMenu = () => setProfileAnchor(null);
  const handleLogout = () => {
    logout();
    closeProfileMenu();
  };

  // Profile Model
  const [openModel, setOpenModel] = useState(false);
  const handleOpenModel = () => setOpenModel(true);
  const handleCloseModel = () => setOpenModel(false);

  // Side Drawer
  const [drawerAnchor, setDrowerAnchor] = useState(false);
  const handleDrawerOpen = () => setDrowerAnchor(true);
  const handleDrawerClose = () => setDrowerAnchor(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "0.5rem 1rem",
        }}
      >
        <Tooltip title="Search users to chat" placement="bottom-end" arrow>
          <Button variant="filledTonal" startIcon={<Search />} onClick={handleDrawerOpen}>
            <Typography
              sx={{ display: { sm: "none", md: "flex" }, textTransform: "none" }}
            >
              Search User
            </Typography>
          </Button>
        </Tooltip>

        <Typography variant="h5" color="primary">
          Hubbie Chat
        </Typography>

        <Box>
          <IconButton size="large">
            <Notifications />
          </IconButton>
          {/* <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          keepMounted
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
        >
          <MenuItem>Notification 1</MenuItem>
        </Menu> */}

          <Tooltip title={user.name}>
            <IconButton
              onClick={(e) => setProfileAnchor(e.currentTarget)}
              color="inherit"
            >
              <Avatar alt={user.name} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={profileAnchor}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            keepMounted
            open={Boolean(profileAnchor)}
            onClose={closeProfileMenu}
          >
            <ProfileModel
              open={openModel}
              handleOpen={handleOpenModel}
              handleClose={handleCloseModel}
              user={user}
            >
              <MenuItem onClick={handleOpenModel}>Profile</MenuItem>
            </ProfileModel>
            <MenuItem onClick={handleLogout}>Log out</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Drawer anchor="left" open={drawerAnchor} onClose={handleDrawerClose}>
        <Box sx={{ width: "25rem" }}>
          <Typography variant="h5" width="100%" p={2} align="center">
            Search User
          </Typography>
          <Divider />
          <Box
            display="flex"
            p={2}
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: "60%" }}
            />
            <Button onClick={handleSearch}>Go</Button>
          </Box>
          {alertElem}
        </Box>
        {isLoading ? (
          <ChatLoading />
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            {users?.map((u) => (
              <UserCard key={u._id} user={u} handleFunc={() => accessChat(u._id)} />
            ))}
          </Box>
        )}
      </Drawer>
    </>
  );
};
