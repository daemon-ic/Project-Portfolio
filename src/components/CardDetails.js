import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  mainCard: {
    [theme.breakpoints.down("xs")]: {},
  },
}));

export default function Cards({ project }) {
  const classes = useStyles();
  return (
    <Paper
      variant="outlined"
      style={{
        borderRadius: "0",
        height: "550px",
        width: "175px",
        cursor: "pointer",
      }}
      elevation={0}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
        }}
      >
        <div
          style={{
            fontSize: "50px",
            marginTop: "80px",
            marginLeft: "20px",
            marginBottom: "90px",
            height: "100px",
            color: "#3C4144",
          }}
        >
          {project.no}
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            marginBottom: "15px",
            fontSize: "13px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#707070",
              fontWeight: "bold",
            }}
          >
            <div>{project.name}</div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                fontSize: "15px",
                color: "gray",
              }}
            >
              -
            </div>
          </div>
        </div>

        <img
          style={{ marginBottom: "15px" }}
          height="100px"
          src={
            project.thumbnail
              ? project.thumbnail
              : "https://firebasestorage.googleapis.com/v0/b/portfolio-50001.appspot.com/o/projectPhotos%2Fdefault.png?alt=media&token=1de96bc6-363f-406e-af79-b510a8d80dd3"
          }
        />

        {/* <div
          style={{
            backgroundColor: "blue",
            height: "100px",
            marginBottom: "15px",
          }}
        /> */}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "10px",
                color: "grey",
                justifyContent: "flex-end",
                marginBottom: "7px",
              }}
            >
              // {project.caption}
            </div>

            <div
              style={{
                display: "flex",
                fontSize: "8px",
                color: "grey",
                justifyContent: "flex-end",
              }}
            >
              {project.date}
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}
