import { makeStyles } from "@material-ui/core/styles";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles({
  arrow: {
    transition: "all .2s ease",

    "&:hover": {
      color: "#017ac1",
    },
  },
});

const CollapsingIcon = ({ open }) => {
  const classes = useStyles();

  if (!open) {
    return <KeyboardArrowDown fontSize="large" className={classes.arrow} />;
  }

  return <KeyboardArrowUp fontSize="large" className={classes.arrow} />;
};

export default CollapsingIcon;
