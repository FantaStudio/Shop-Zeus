import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

const useStyles = makeStyles({
  root: {},
  content: {},
});

const CollapsingBlock = ({ title, children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  return (
    <div className={classes.root}>
      <h3>{title}</h3>

      {open && <div className={classes.content}>{children}</div>}
    </div>
  );
};

export default CollapsingBlock;
