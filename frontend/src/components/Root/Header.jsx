import { makeStyles } from "@material-ui/core/styles";
import { ExitToApp, ShoppingBasket } from "@material-ui/icons";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import { secondaryThemeColor } from "../../helpers/colors";
import Logo from "../System/Logo";
import auth from "./../../store/auth";
import ZeusButton from "./../System/ZeusButton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBasket: {
    display: "flex",
    alignItems: "center",
    margin: "0 .8rem",
    cursor: "pointer",
    color: secondaryThemeColor,
  },
  icons: {
    display: "flex",
  },
});

const Header = view(() => {
  const classes = useStyles();

  return (
    <header>
      <div id="main-content">
        <div className={classes.root}>
          <Logo />

          <div className={classes.icons}>
            {auth?.profile && (
              <div className={classes.iconBasket}>
                <ShoppingBasket
                  fontSize="large"
                  style={{ marginRight: ".1rem" }}
                />
                Корзина
              </div>
            )}

            {auth?.profile && (
              <div className={classes.iconBasket}>
                <ExitToApp fontSize="large" style={{ marginRight: ".1rem" }} />
              </div>
            )}

            {!auth?.profile && (
              <div>
                <ZeusButton>Войти</ZeusButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
