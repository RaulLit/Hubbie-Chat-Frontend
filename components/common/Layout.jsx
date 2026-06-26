import { Box } from "@mui/material";
import { useAlert } from "../../hooks/useAlert";

export const Layout = ({ children }) => {
  const { alertElem } = useAlert();

  return (
    <Box>
      {children}
      {alertElem}
    </Box>
  );
};
