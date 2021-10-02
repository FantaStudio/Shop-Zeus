import { makeStyles } from "@material-ui/core/styles";
import React from "react";

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
      <img src="/images/logotip.png" alt="logo" className={classes.image} />
    </div>
  );
};

export default Logo;
