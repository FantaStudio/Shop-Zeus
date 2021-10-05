import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  root: {},
});

const ShoppingBasket = () => {
  const classes = useStyles();

  return <div className={classes.root}></div>;
};

export default ShoppingBasket;
