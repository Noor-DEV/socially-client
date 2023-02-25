import React, { useEffect } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import classes from "./style.module.css";

const Success = () => {
  useEffect(() => {
    console.log("SUUCEESS-RENDERED........");
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <CheckCircleOutlineIcon sx={{ fontSize: "4rem" }} />
        <h1>Successfully Logged In.</h1>
      </div>

      <p className={classes.text}>Thank You For Logging in to Soccially.</p>
      <p className={classes.text}>You can now close this window.</p>
      <div className={classes.btns}>
        <button
          className={classes.btn}
          onClick={() => {
            window.close();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Success;
