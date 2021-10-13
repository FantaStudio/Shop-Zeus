import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    marginBottom: "1rem",
  },
});

const Block = ({ header, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h4 style={{ margin: 0, marginBottom: ".7rem" }}>{header}</h4>

      {children}
    </div>
  );
};

export default Block;
