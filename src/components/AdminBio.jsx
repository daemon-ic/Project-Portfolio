import React, { useState, useContext } from "react";
import fire from "../Firebase";
import { storage } from "../Firebase";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import DisabledAdminBio from "./DisabledAdminBio";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

var projectsDB = fire.firestore().collection("Projects");
var configDB = fire.firestore().collection("Config");

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexWrap: "wrap",
  },

  bioDescription: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function SimplePaper({ bioInfo }) {
  const bio = bioInfo[0];
  const [tinyCaption, setTinyCaption] = useState(bio.tinyCaption);
  const [nameInput, setNameInput] = useState(bio.name);
  const [captionInput, setCaptionInput] = useState(bio.caption);
  const [bioInput, setBioInput] = useState(bio.description);
  const [photoInput, setPhotoInput] = useState(bio.photo);
  const [editMode, setEditMode] = useState(false);

  const classes = useStyles();
  // const uploadAvi = useContext(uploadAviContext);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };
  //--------------------------------------------------------------- FUNCTIONS
  const updateBio = () => {
    configDB.doc("Bio").set({
      tinyCaption: tinyCaption,
      name: nameInput,
      caption: captionInput,
      description: bioInput,
      photo: photoInput,
    });
    setEditMode(!editMode);
  };

  const uploadAvi = async (e) => {
    const file = e.target.files[0];

    const storageRef = storage.ref();
    const fileRef = storageRef.child(`projectPics/profilePic`);
    await fileRef.put(file);

    const downloadUrl = await fileRef.getDownloadURL();
    console.log("download url", downloadUrl);

    setPhotoInput(downloadUrl);
    applyAvi(downloadUrl);
  };

  const applyAvi = async (downloadUrl) => {
    await configDB.doc("Bio").update({ photo: downloadUrl });
  };

  //--------------------------------------------------------------- FUNCTIONS
  return (
    <div className={classes.card}>
      <Paper
        style={{ display: "flex", flexDirection: "column", margin: "10px" }}
        elevation={0}
      >
        {editMode ? (
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
              <button onClick={updateBio}>Update</button>
            </div>
            <TextField
              style={{
                width: "300px",
                marginTop: "10px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
              id="outlined-basic"
              variant="outlined"
              value={tinyCaption}
              onChange={(e) => setTinyCaption(e.currentTarget.value)}
            />
            <TextField
              style={{
                width: "300px",
                marginTop: "10px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
              id="outlined-basic"
              value={nameInput}
              onChange={(e) => setNameInput(e.currentTarget.value)}
              variant="outlined"
            />
            <TextField
              style={{
                width: "300px",
                marginTop: "10px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
              id="outlined-basic"
              value={captionInput}
              onChange={(e) => setCaptionInput(e.currentTarget.value)}
              variant="outlined"
            />
            <TextField
              style={{
                width: "300px",
                margin: "10px",
              }}
              id="outlined-textarea"
              value={bioInput}
              onChange={(e) => setBioInput(e.currentTarget.value)}
              multiline
              variant="outlined"
            />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="icon-button-file3"
                  type="file"
                  onChange={uploadAvi}
                />
                <label htmlFor="icon-button-file3">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>

              <TextField
                style={{
                  width: "250px",
                  margin: "10px",
                }}
                id="outlined-textarea"
                value={photoInput}
                disabled
                variant="outlined"
              />
            </div>
          </>
        ) : (
          <DisabledAdminBio bio={bio} toggleEdit={toggleEdit} />
        )}
      </Paper>
    </div>
  );
}
