import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import LoginDialog from "./LoginDialog";

const useStyles = makeStyles((theme) => ({
  bioContainer: {
    display: "flex",
    flexWrap: "wrap",
    // marginLeft: "7vw",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0vw",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
    },
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  bioContents: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "0",
  },
}));

export default function Bio({ listOfProjects, bioInfo }) {
  const bio = bioInfo[0];
  const classes = useStyles();
  console.log(listOfProjects);

  return (
    <div className={classes.bioContainer}>
      <Paper
        className={classes.bioContents}
        variant="outlined"
        style={{ height: "550px", width: "350px" }}
        elevation={0}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            fontSize: "8px",
            marginRight: "30px",
            marginTop: "30px",
            color: "grey",
            alignItems: "center",
          }}
        >
          // {bio.tinyCaption}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            fontSize: "13px",
            marginLeft: "30px",
            marginTop: "40px",
            color: "#707070",
            fontWeight: "bold",
          }}
        >
          {bio.name}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            fontSize: "10px",
            marginLeft: "30px",
            marginTop: "7px",
            color: "grey",
          }}
        >
          // {bio.caption}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <img
            style={{ marginTop: "10px" }}
            width="80%"
            height="275px"
            src={bio.photo}
            alt={""}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            fontSize: "30px",
            marginLeft: "30px",
            color: "grey",
          }}
        >
          _
        </div>
        <div
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            fontSize: "10px",
            marginLeft: "30px",
            marginTop: "7px",
            color: "grey",
          }}
        >
          {bio.description}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            fontSize: "10px",
            marginTop: "7px",
            color: "grey",
          }}
        >
          <LoginDialog />
        </div>
      </Paper>
    </div>
  );
}
