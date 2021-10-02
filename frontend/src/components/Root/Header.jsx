import { makeStyles } from "@material-ui/core/styles";
import { ShoppingBasket } from "@material-ui/icons";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import Logo from "../System/Logo";
import auth from "./../../store/auth";
import ZeusButton from "./../System/ZeusButton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
  },
});

const Header = view(() => {
  const classes = useStyles();

  return (
    <header>
      <div id="main-content">
        <div className={classes.root}>
          <Logo />

          {auth?.profile && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0 .8rem",
                cursor: "pointer",
                color: "#007fff",
              }}
            >
              <ShoppingBasket
                fontSize="large"
                style={{ marginRight: ".1rem" }}
              />
              Корзина
            </div>
          )}

          {!auth?.profile && (
            <div>
              <ZeusButton>Войти</ZeusButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
