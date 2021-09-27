import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#007fff",
    borderRadius: "1rem",
    color: "#f2f3f4",
    height: "auto",
    fontFamily: "'Montserrat', sans-serif",
    textTransform: "none",

    "&:hover": {
      backgroundColor: "#75bbfd",
      color: "#050305",
    },
  },
});

const ZeusButton = ({ children, style = {}, onClick, fullWidth, ...rest }) => {
  const classes = useStyles();

  return (
    <Button
      {...rest}
      variant="contained"
      className={classes.root}
      onClick={onClick}
      style={style}
      fullWidth={fullWidth}
    >
      {children}
    </Button>
  );
};

export default ZeusButton;
