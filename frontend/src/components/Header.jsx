import { makeStyles } from "@material-ui/core/styles";
import { Close, Menu } from "@material-ui/icons";
import React, { useState } from "react";
import ZeusButton from "./System/ZeusButton";

const useStyles = makeStyles({
  icon: {
    marginRight: ".1rem",
  },
});

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div id="main-content">
        <ZeusButton onClick={open ? () => setOpen(false) : () => setOpen(true)}>
          {open ? (
            <Close className={classes.icon} />
          ) : (
            <Menu className={classes.icon} />
          )}
          Каталог
        </ZeusButton>
      </div>
    </header>
  );
};

export default Header;
