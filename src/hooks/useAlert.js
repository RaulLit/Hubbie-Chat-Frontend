import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

export const useAlert = () => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({});
  const handleClose = () => setOpen(false);
  const showAlert = () => setOpen(true);
  const setAlert = (obj) => setSettings(obj);
  const alertElem = (
    <Snackbar open={open} {...settings.snackbar} onClose={handleClose}>
      <Alert onClose={handleClose} {...settings.alert}>
        {settings.message}
      </Alert>
    </Snackbar>
  );
  return { setAlert, alertElem, showAlert, handleClose };
};
