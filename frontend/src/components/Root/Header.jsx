import { Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExitToApp, ShoppingBasket } from "@material-ui/icons";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import { Link, useHistory } from "react-router-dom";
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
  const history = useHistory();

  return (
    <header>
      <div id="main-content">
        <div className={classes.root}>
          <Logo />

          <div className={classes.icons}>
            <div
              className={classes.iconBasket}
              onClick={() => history.push("/shopping-basket")}
            >
              {auth?.productsInBasket?.length > 0 ? (
                <Badge
                  color="primary"
                  badgeContent={auth?.productsInBasket?.length}
                >
                  <ShoppingBasket
                    fontSize="large"
                    style={{ marginRight: ".1rem" }}
                  />
                </Badge>
              ) : (
                <ShoppingBasket
                  fontSize="large"
                  style={{ marginRight: ".1rem" }}
                />
              )}
              Корзина
            </div>

            {auth?.profile && (
              <div className={classes.iconBasket}>
                <ExitToApp fontSize="large" style={{ marginRight: ".1rem" }} />
              </div>
            )}

            {!auth?.profile && (
              <div>
                <ZeusButton component={Link} to="/login">
                  Войти
                </ZeusButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
