import { Avatar, Box, Button, Typography } from "@mui/material";

export const UserCard = ({ user, handleFunc }) => {
  return (
    <Button
      variant="outlined"
      onClick={handleFunc}
      sx={{
        display: "flex",
        width: "90%",
        marginBottom: 1,
        padding: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        textTransform: "none",
      }}
    >
      <Avatar alt={user.name}>{user.name[0]}</Avatar>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="flex-start"
        ml={2}
      >
        <Typography>{user.name}</Typography>
        <Typography>{user.email}</Typography>
      </Box>
    </Button>
  );
};
