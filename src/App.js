import React, { useState, useEffect } from "react";
import { storage } from "./Firebase";

import fire from "./Firebase";
import "./App.css";
import Router from "./Router";
export const routeContext = React.createContext();
export const uploadAviContext = React.createContext();

var projectsDB = fire.firestore().collection("Projects");
var configDB = fire.firestore().collection("Config");

//--------------------------------------------------------------- CUSTOM HOOK

function useProjectData() {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const unsubscribe = projectsDB.orderBy("no").onSnapshot((snapshot) => {
      const retrievedProjectData = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      setProjectList(retrievedProjectData);
    });

    return () => unsubscribe();
  }, []);

  return projectList;
}

function useConfigData() {
  const [config, setConfig] = useState([]);

  useEffect(() => {
    const unsubscribe = configDB.onSnapshot((snapshot) => {
      const retrievedConfigData = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      setConfig(retrievedConfigData);
    });

    return () => unsubscribe();
  }, []);

  return config;
}

//--------------------------------------------------------------- CUSTOM HOOK
//--------------------------------------------------------------- SETUP

//TODO, UNDO PROP DRILL BIOINFO AND LIST OF PROJECTS, USE CONTEXT

function App() {
  const listOfProjects = useProjectData();
  const bioInfo = useConfigData();

  const routePages = [
    { title: "Home", path: "/" },
    { title: "Login", path: "/login" },
    { title: "Admin", path: "/admin" },
  ];

  //--------------------------------------------------------------- SETUP
  //--------------------------------------------------------------- FUNCTIONS

  const uploadAvi = async (e) => {
    const file = e.target.files[0];

    const storageRef = storage.ref();
    const fileRef = storageRef.child(`projectPics/profilePic`);
    await fileRef.put(file);

    const downloadUrl = await fileRef.getDownloadURL();
    console.log("download url", downloadUrl);

    applyAvi(downloadUrl);
  };

  const applyAvi = async (downloadUrl) => {
    await configDB.doc("Bio").update({ photo: downloadUrl });
  };

  //--------------------------------------------------------------- FUNCTIONS
  //--------------------------------------------------------------- RENDER

  return (
    <uploadAviContext.Provider value={uploadAvi}>
      <routeContext.Provider value={routePages}>
        <div>
          <Router listOfProjects={listOfProjects} bioInfo={bioInfo} />
        </div>
      </routeContext.Provider>
    </uploadAviContext.Provider>
  );
}

export default App;
//--------------------------------------------------------------- RENDER
