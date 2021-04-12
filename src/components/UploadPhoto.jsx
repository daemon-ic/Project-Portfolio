import React from "react";
import { storage } from "../Firebase";

const UploadPhoto = () => {
  const firstFunction = async (e) => {
    // ------------------------------------------------------------ Saving Avi upload to storage and then get URL

    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`projectPics/profilePic`);
    await fileRef.put(file);
    const downloadUrl = await fileRef.getDownloadURL();

    // ------------------------------------------------------------ Got Url and put in state

    //------------------------------------------------------------- Take Avi URL and place in User doc

    location.reload();
  };

  const updateUser = async (downloadUrl) => {
    const authUser = fire.auth().currentUser.email;
    await usersDB.doc(authUser).update({ ProfilePicture: downloadUrl });
  };

  return <div>upload photo</div>;
};

export default UploadPhoto;
