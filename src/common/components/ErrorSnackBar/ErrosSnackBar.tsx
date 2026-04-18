import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "@/common/hooks";
import { selectError, setErrorAC } from "@/app/app-slice";

export const ErrorSnackBar = () => {
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") return;
    dispatch(setErrorAC({error: null}))
  }; 

  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert onClose={handleClose} severity="error" variant="filled">
        {error}
      </Alert>
    </Snackbar>
  );
};
