import React, { useState } from "react";
import fire from "../Firebase";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import LockSharpIcon from "@material-ui/icons/LockSharp";
import { useHistory } from "react-router-dom";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState("admin@admin.admin");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const history = useHistory();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push("/admin"))
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <LockSharpIcon
        onClick={handleClickOpen}
        style={{
          margin: "20px",
          cursor: "pointer",
          height: "15px",
          width: "15px",
        }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={handleClose} color="primary">
            <CloseIcon style={{ width: "15px", height: "15px" }} />
          </Button>
          <Button onClick={handleClose} color="primary">
            <ArrowForwardIcon
              onClick={handleLogin}
              style={{ width: "15px", height: "15px" }}
            />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
