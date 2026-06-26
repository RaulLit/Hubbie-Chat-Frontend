import { createContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

export const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({});
  const handleClose = () => setOpen(false);
  const showAlert = () => setOpen(true);

  /**
   * Show an alert with custom settings.
   * @param {Object} obj - Alert configuration object.
   * @param {string} [obj.message="This is an alert"] - The alert message.
   * @param {"filled"|"outlined"|"standard"} [obj.variant="filled"] - The alert variant.
   * @param {"success"|"info"|"warning"|"error"} [obj.severity="success"] - The alert severity.
   * @param {number} [obj.duration=3000] - How long the alert should be displayed in milliseconds.
   * @param {"top"|"bottom"} [obj.vertical="bottom"] - The vertical position of the alert.
   * @param {"left"|"center"|"right"} [obj.horizontal="right"] - The horizontal position of the alert.
   */
  const setAlert = (obj) => {
    let settingsObj = {};
    if (typeof obj === "object") {
      settingsObj = {
        message: obj.message || null,
        alert: {
          variant: obj.variant || "filled",
          severity: obj.severity || "success",
        },
        snackbar: {
          autoHideDuration: obj.duration || 3000,
          anchorOrigin: {
            vertical: obj.vertical || "bottom",
            horizontal: obj.horizontal || "right",
          },
        },
      };
    } else {
      settingsObj = {
        message: obj || "This is an alert",
        alert: {
          variant: "filled",
          severity: "success",
        },
        snackbar: {
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        },
      };
    }

    setSettings(settingsObj);
    showAlert();
  };
  const alertElem = (
    <Snackbar open={open} {...settings.snackbar} onClose={handleClose}>
      <Alert onClose={handleClose} {...settings.alert}>
        {settings.message}
      </Alert>
    </Snackbar>
  );
  return (
    <AlertContext.Provider value={{ setAlert, alertElem, showAlert, handleClose }}>
      {children}
    </AlertContext.Provider>
  );
};
