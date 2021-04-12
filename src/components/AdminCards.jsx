import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import EditableProjectConfig from "./EditableProjectConfig";
import NewProjectConfig from "./NewProjectConfig";

// make
const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    overflow: "scroll",
  },

  bioDescription: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function SimplePaper({ listOfProjects }) {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <Paper
        style={{
          margin: "10px",
          width: "350px",
          background: "white",
        }}
        elevation={0}
      >
        <NewProjectConfig />
      </Paper>

      {!listOfProjects && <h1>Loading</h1>}
      {listOfProjects &&
        listOfProjects[0] &&
        listOfProjects.map((project) => {
          return (
            // ------------------------------------------------------------------------------------------- IN MAP

            <div key={project.id}>
              <Paper
                style={{
                  margin: "10px",
                  width: "350px",
                }}
                elevation={0}
              >
                <EditableProjectConfig project={project} />
              </Paper>
            </div>
          );
        })}
    </div>
    // ------------------------------------------------------------------------------------------- IN MAP
  );
}
