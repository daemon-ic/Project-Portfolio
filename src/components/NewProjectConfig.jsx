import React, { useState } from "react";
import fire from "../Firebase";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../Firebase";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

var projectsDB = fire.firestore().collection("Projects");

const NewProjectConfig = ({ project }) => {
  const [noInput, setNoInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [captionInput, setCaptionInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [bioInput, setBioInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [thumbnailInput, setThumbnailInput] = useState("");

  const createProject = () => {
    const id = uuidv4();

    projectsDB.doc(nameInput).set({
      url: urlInput,
      caption: captionInput,
      date: dateInput,
      name: nameInput,
      no: noInput,
      description: bioInput,
      thumbnail: thumbnailInput,
      id,
    });

    applyThumbnail(thumbnailInput);
    setNoInput("");
    setNameInput("");
    setCaptionInput("");
    setDateInput("");
    setBioInput("");
    setUrlInput("");
    setThumbnailInput("");
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

  return (
    <div>
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
          <h1>Add Project</h1>
          <button onClick={createProject}>Create</button>
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
          placeholder="Number"
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
          placeholder="Name"
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
          placeholder="Caption"
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
          variant="outlined"
          placeholder="Date"
        />
        <TextField
          style={{
            width: "300px",
            margin: "10px",
          }}
          id="outlined-textarea"
          value={bioInput}
          onChange={(e) => setBioInput(e.currentTarget.value)}
          placeholder="Bio"
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
          placeholder="URL"
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
              id="icon-button-file"
              type="file"
              onChange={uploadThumbnail}
            />
            <label htmlFor="icon-button-file">
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
  );
};

export default NewProjectConfig;
