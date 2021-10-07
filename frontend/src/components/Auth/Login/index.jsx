import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  block: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: "1rem",
    maxWidth: 500,
    width: "100%",
  },
});

const Login = () => {
  const location = useLocation();
  const classes = useStyles();

  console.log(location.state);

  return (
    <div className={classes.root}>
      <div className={classes.block}></div>
    </div>
  );
};

export default Login;
