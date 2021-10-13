import { Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExitToApp, Person, ShoppingBasket } from "@material-ui/icons";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { secondaryThemeColor } from "../../helpers/colors";
import Logo from "../System/Logo";
import { useCurrentWidth } from "./../../hooks/useCurrentWidth";
import auth from "./../../store/auth";
import ZeusButton from "./../System/ZeusButton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
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

  const { currentWidth } = useCurrentWidth();

  const xs = currentWidth <= 500;

  return (
    <header>
      <div id="main-content">
        <div className={classes.root}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Logo />

            {!xs && auth?.profile && (
              <>
                {auth?.profile?.roles?.includes("Admin") ? (
                  <p
                    style={{
                      color: secondaryThemeColor,
                      margin: 0,
                      fontWeight: 700,
                      marginLeft: "1rem",
                    }}
                  >
                    {auth?.profile?.name}
                  </p>
                ) : (
                  <p
                    style={{
                      color: secondaryThemeColor,
                      margin: 0,
                      fontWeight: 700,
                      marginLeft: "1rem",
                    }}
                  >
                    <Link
                      to="/client/profile"
                      style={{ color: secondaryThemeColor }}
                    >
                      {auth?.profile?.name}
                    </Link>
                  </p>
                )}
              </>
            )}
          </div>

          <div className={classes.icons}>
            {!auth?.profile?.roles?.includes("Admin") && (
              <div
                className={classes.icon}
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
            )}

            {auth?.profile && auth?.profile?.roles?.includes("Client") && (
              <div
                className={classes.icon}
                onClick={() => history.push("/client/profile")}
              >
                <Person fontSize="large" style={{ marginRight: ".1rem" }} />
                Профиль
              </div>
            )}

            {auth?.profile && (
              <div className={classes.icon}>
                <ExitToApp
                  fontSize="large"
                  style={{ marginRight: ".1rem" }}
                  onClick={() => {
                    window.location.replace("/");

                    localStorage.removeItem("zeusShopToken");

                    setTimeout(() => (auth.profile = undefined), 200);
                  }}
                />
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
