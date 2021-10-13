import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 120,
    height: "auto",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

const Logo = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link to="/">
        <img src="/images/logotip.png" alt="logo" className={classes.image} />
      </Link>
    </div>
  );
};

export default Logo;
