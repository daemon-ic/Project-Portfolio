import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Bio from "../components/Bio";
import Cards from "../components/Cards";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    background: "#E4E4E4",
    height: "100vh",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      height: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

const Home = ({ listOfProjects, bioInfo }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.main}>
        {!bioInfo && <h1>Loading</h1>}
        {bioInfo && bioInfo[0] && (
          <div>
            <Bio bioInfo={bioInfo} />
          </div>
        )}
        {!listOfProjects && <h1>Loading</h1>}
        {listOfProjects && listOfProjects[0] && (
          <div style={{ overflow: "scroll" }}>
            <Cards listOfProjects={listOfProjects} />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
