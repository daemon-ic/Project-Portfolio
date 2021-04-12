import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

export default function App({ listOfProjects, bioInfo }) {
  return (
    <div>
      <Router>
        <Route exact path="/">
          <Home listOfProjects={listOfProjects} bioInfo={bioInfo} />
        </Route>

        <Route path="/admin">
          <Admin listOfProjects={listOfProjects} bioInfo={bioInfo} />
        </Route>
      </Router>
    </div>
  );
}
