import { Box, Typography } from "@mui/material";

export const NotFound = () => {
  return (
    <Box>
      <Typography variant="h3">Oops!</Typography>
      <Typography variant="h2" color="primary">
        {"404 Page not found :("}
      </Typography>
    </Box>
  );
};
