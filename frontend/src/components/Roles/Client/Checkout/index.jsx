import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useRequireAuth } from "./../../../../hooks/useRequireAuth";

const useStyles = makeStyles({
  root: {},
});

const Checkout = () => {
  useRequireAuth(["Client"]);

  const classes = useStyles();

  return <div></div>;
};

export default Checkout;
