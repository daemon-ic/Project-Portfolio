import React, { useState } from "react";
import fire from "../Firebase";
import { storage } from "../Firebase";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import DisabledProjectConfig from "./DisabledProjectConfig";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

var projectsDB = fire.firestore().collection("Projects");

const EditableProjectConfig = ({ project }) => {
  const [noInput, setNoInput] = useState(project.no);
  const [nameInput, setNameInput] = useState(project.name);
  const [captionInput, setCaptionInput] = useState(project.caption);
  const [dateInput, setDateInput] = useState(project.date);
  const [bioInput, setBioInput] = useState(project.description);
  const [urlInput, setUrlInput] = useState(project.url);
  const [thumbnailInput, setThumbnailInput] = useState(project.thumbnail);
  const [editMode, setEditMode] = useState(false);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const uploadThumbnail = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`projectPhotos/${nameInput}`);
    await fileRef.put(file);
    const downloadUrl = await fileRef.getDownloadURL();
    setThumbnailInput(downloadUrl);
  };

  const applyThumbnail = async (downloadUrl) => {
    await projectsDB.doc(nameInput).update({ thumbnail: downloadUrl });
  };

  const saveEdits = () => {
    projectsDB.doc(nameInput).set({
      caption: captionInput,
      date: dateInput,
      name: nameInput,
      no: noInput,
      description: bioInput,
      url: urlInput,
      thumbnail: thumbnailInput,
    });

    applyThumbnail(thumbnailInput);
    setEditMode(!editMode);
    setNoInput(() => project.no);
    setNameInput(() => project.name);
    setCaptionInput(() => project.caption);
    setDateInput(() => project.date);
    setBioInput(() => project.description);
    setUrlInput(() => project.url);
    setThumbnailInput(() => project.thumbnail);
  };

  return (
    <div>
      {editMode ? (
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
            <button onClick={saveEdits}>Save</button>
          </div>
          <TextField
            style={{
              width: "300px",
              marginTop: "10px",
              marginRight: "10px",
              marginLeft: "10px",
            }}
            id="outlined-basic"
            value={noInput}
            variant="outlined"
            onChange={(e) => setNoInput(e.currentTarget.value)}
            label="No."
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
            label="Name"
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
            label="Caption"
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
            value={dateInput}
            onChange={(e) => setDateInput(e.currentTarget.value)}
            label="Date"
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
            label="Description"
            placeholder="Placeholder"
            multiline
            variant="outlined"
          />
          <TextField
            style={{
              width: "300px",
              margin: "10px",
            }}
            id="outlined-textarea"
            value={urlInput}
            onChange={(e) => setUrlInput(e.currentTarget.value)}
            label="URL"
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
              <div>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="icon-button-file2"
                  type="file"
                  onChange={uploadThumbnail}
                />
                <label htmlFor="icon-button-file2">
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
                value={thumbnailInput}
                disabled
                variant="outlined"
              />
            </div>
          </div>
        </div>
      ) : (
        <DisabledProjectConfig project={project} toggleEdit={toggleEdit} />
      )}
    </div>
  );
};

export default EditableProjectConfig;
