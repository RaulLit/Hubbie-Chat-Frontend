import { useContext } from "react";
import { AlertContext } from "../contexts/AlertContext";

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw Error("useAlert must be used inside AlertContextProvider");

  const { setAlert, alertElem, showAlert, handleClose } = context;

  return { setAlert, alertElem, showAlert, handleClose };
};
