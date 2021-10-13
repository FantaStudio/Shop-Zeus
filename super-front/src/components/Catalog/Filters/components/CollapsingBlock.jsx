import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import CollapsingIcon from "../../../System/CollapsingIcon";

const useStyles = makeStyles({
  root: {
    padding: ".3rem",
    borderBottom: `1px solid ${grey[300]}`,
  },
  contentOpen: {
    animation: "$open .3s ease-in-out both",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    margin: ".2rem 0",
    color: grey[700],
  },

  "@keyframes open": {
    "0%": {
      opacity: 0,
    },
    "25%": {
      opacity: 0.25,
    },
    "50%": {
      opacity: 0.5,
    },
    "75%": {
      opacity: 0.75,
    },
    "100%": {
      opacity: 1,
    },
  },
});

const CollapsingBlock = ({ title, children, initialState = true }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(initialState);

  return (
    <div className={classes.root}>
      <h4
        className={classes.header}
        onClick={() => setOpen((prevState) => !prevState)}
      >
        {title} <CollapsingIcon open={open} />
      </h4>

      {open && <div className={classes.contentOpen}>{children}</div>}
    </div>
  );
};

export default CollapsingBlock;
