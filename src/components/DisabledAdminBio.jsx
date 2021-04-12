import React from "react";
import TextField from "@material-ui/core/TextField";

const DisabledAdminBio = ({ toggleEdit, bio }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          color: "grey",
        }}
      >
        <h1>Bio</h1>
        <button onClick={toggleEdit}>Edit</button>
      </div>
      <TextField
        style={{
          width: "300px",
          marginTop: "10px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
        id="outlined-basic"
        variant="filled"
        value={bio.tinyCaption}
        disabled
      />
      <TextField
        style={{
          width: "300px",
          marginTop: "10px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
        id="outlined-basic"
        value={bio.name}
        disabled
        variant="filled"
      />
      <TextField
        style={{
          width: "300px",
          marginTop: "10px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
        id="outlined-basic"
        value={bio.caption}
        disabled
        variant="filled"
      />
      <TextField
        style={{
          width: "300px",
          margin: "10px",
        }}
        id="outlined-textarea"
        value={bio.description}
        disabled
        multiline
        variant="filled"
      />
    </>
  );
};

export default DisabledAdminBio;
