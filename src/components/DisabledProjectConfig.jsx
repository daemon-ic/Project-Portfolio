import React from "react";
import fire from "../Firebase";
import TextField from "@material-ui/core/TextField";

var projectsDB = fire.firestore().collection("Projects");

const DisabledProjectConfig = ({ project, toggleEdit }) => {
  const deleteProject = () => {
    projectsDB.doc(project.name).delete();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          color: "grey",
        }}
      >
        <h1>{project.name}</h1>
        <button onClick={toggleEdit}>Edit</button>
        <button onClick={deleteProject}>Delete</button>
      </div>
      <TextField
        style={{
          width: "300px",
          marginTop: "10px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
        disabled
        id="filled-disable"
        variant="filled"
        value={project.no}
      />
      <TextField
        style={{
          width: "300px",
          marginTop: "10px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
        disabled
        id="filled-disable"
        variant="filled"
        value={project.name}
      />
      <TextField
        style={{
          width: "300px",
          marginTop: "10px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
        disabled
        id="filled-disable"
        variant="filled"
        value={project.caption}
      />
      <TextField
        style={{
          width: "300px",
          marginTop: "10px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
        disabled
        id="filled-disable"
        variant="filled"
        value={project.date}
      />
      <TextField
        style={{
          width: "300px",
          margin: "10px",
        }}
        id="outlined-textarea"
        value={project.description}
        disabled
        id="filled-disable"
        variant="filled"
        multiline
      />
      <TextField
        style={{
          width: "300px",
          margin: "10px",
        }}
        id="outlined-textarea"
        value={project.url}
        disabled
        multiline
        variant="filled"
      />
    </div>
  );
};

export default DisabledProjectConfig;
