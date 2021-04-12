import React from "react";
import AdminBio from "../components/AdminBio";
import AdminCards from "../components/AdminCards";

const Admin = ({ listOfProjects, bioInfo }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#E4E4E4",
      }}
    >
      <div>
        {!bioInfo && <h1>Loading</h1>}
        {bioInfo && bioInfo[0] && <AdminBio bioInfo={bioInfo} />}
      </div>
      <div>
        <AdminCards listOfProjects={listOfProjects} />
      </div>
    </div>
  );
};

export default Admin;
