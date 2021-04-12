import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import CardDetails from "./CardDetails";

const useStyles = makeStyles((theme) => ({
  mainCard: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      flexWrap: "wrap",
    },
  },

  dialogContent: {
    display: "flex",
    flexDirection: "column",
    height: "500px",
    width: "60vw",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    height: "95%",
  },
  dialogDate: {
    fontSize: "12px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: "30px",
    color: "grey",
  },
  dialogNum: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: "30px",
    fontSize: "50px",
  },
  mainContentContainer: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  dialogImageContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  dialogImage: {},
  dialogTitle: { display: "flex", marginTop: "30px", fontWeight: "bold" },
  dialogCaption: { fontSize: "12px", marginTop: "7px", color: "grey" },

  dialogContentDescContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  dialogDescription: {
    fontSize: "14px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      marginTop: "30px",
      overflow: "scroll",
      marginLeft: "20px",
      marginRight: "20px",
    },
  },

  dialogVisit: {
    fontSize: "10px",
    color: "black",
    marginTop: "30px",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "60px",
    },
  },
}));

export default function Cards({ listOfProjects }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [currentDialogInfo, setCurrentDialogInfo] = useState("");

  const handleClickOpen = (dialogInfo) => {
    setCurrentDialogInfo(dialogInfo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.mainCard}>
      {listOfProjects.map((project, index) => {
        let time = 0;
        const variableTime = () => {
          if (index > 10) {
            time = 5000;
          } else {
            time = (index + 1) * 500;
          }
        };
        variableTime();

        return (
          <div key={project.id}>
            <Grow
              in={true}
              style={{ transformOrigin: "center top" }}
              timeout={time}
            >
              <div
                onClick={() => handleClickOpen(project)}
                className={classes.cardContainer}
              >
                <CardDetails project={project} />
              </div>
            </Grow>
          </div>
        );
      })}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent className={classes.dialogContent}>
          <div className={classes.mainContainer}>
            {/*---------------------------------------------------*/}
            <div className={classes.dialogDate}>{currentDialogInfo.date}</div>
            <div className={classes.dialogNum}>{currentDialogInfo.no}</div>
            <div className={classes.mainContentContainer}>
              <div className={classes.dialogImageContainer}>
                <img
                  style={{
                    height: "180px",
                    width: "300px",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                  src={currentDialogInfo.thumbnail}
                />
                <div className={classes.dialogTitle}>
                  {currentDialogInfo.name}
                </div>

                <div className={classes.dialogCaption}>
                  // {currentDialogInfo.caption}
                </div>
              </div>

              <div className={classes.dialogContentDescContainer}>
                <div className={classes.dialogDescription}>
                  {currentDialogInfo.description}
                </div>
                <div className={classes.dialogVisit}>
                  <a href={currentDialogInfo.url}>[ VISIT ]</a>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
