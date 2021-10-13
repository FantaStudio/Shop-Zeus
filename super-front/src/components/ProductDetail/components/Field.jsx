import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    marginBottom: ".7rem",
  },
  block: {
    display: "flex",
    justifyContent: "flex-start",
    flex: 1,
    fontSize: "1rem",
    paddingBottom: ".4rem",
  },
  borderBottomBlock: {
    borderBottom: `1px dashed ${grey[500]}`,
  },
});

const Field = ({ left, right }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={clsx(classes.block, classes.borderBottomBlock)}>
        <span>{left}</span>
      </div>

      <div className={classes.block}>
        <span>{right}</span>
      </div>
    </div>
  );
};

export default Field;
