import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LockSharpIcon from "@material-ui/icons/LockSharp";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

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
            label=" Signup Email"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Signup Password"
            type="password"
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
            <ArrowForwardIcon style={{ width: "15px", height: "15px" }} />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
