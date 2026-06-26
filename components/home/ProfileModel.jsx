import { AccountCircle } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "25rem" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const ProfileModel = ({ open, handleOpen, handleClose, user, children }) => {
  return (
    <>
      {children ? (
        <span>{children}</span>
      ) : (
        <IconButton onClick={handleOpen}>
          <AccountCircle />
        </IconButton>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" align="center">
            {user.name}
          </Typography>
          <Divider />
          <Stack justifyContent="center" alignItems="center" spacing={2} mt={2}>
            <Avatar alt={user.name}>{user.name[0]}</Avatar>
            <Typography>Email: {user.email}</Typography>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
