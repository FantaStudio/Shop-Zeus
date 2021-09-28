import { makeStyles } from "@material-ui/core/styles";
import { Close, Menu } from "@material-ui/icons";
import React, { useState } from "react";
import SearchField from "./System/SearchField";
import ZeusButton from "./System/ZeusButton";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  icon: {
    marginRight: ".1rem",
  },
  search: {
    maxWidth: 800,
    width: "100%",
    height: 40,
  },
});

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div id="main-content">
        <div className={classes.root}>
          <div>
            <ZeusButton
              onClick={open ? () => setOpen(false) : () => setOpen(true)}
              style={{ marginRight: "1rem" }}
            >
              {open ? (
                <Close className={classes.icon} />
              ) : (
                <Menu className={classes.icon} />
              )}
              Каталог
            </ZeusButton>
          </div>

          <div className={classes.search}>
            <SearchField onSearch={(search) => console.log(search)} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
