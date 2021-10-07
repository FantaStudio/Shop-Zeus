import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { secondaryThemeColor } from "../../../helpers/colors";
import ZeusButton from "./../../System/ZeusButton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  block: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: "1rem",
    maxWidth: 500,
    width: "100%",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  link: {
    color: secondaryThemeColor,
    marginTop: ".6rem",
  },
});

const Login = () => {
  const location = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Авторизация</h1>
      <div className={classes.block}>
        {location?.state?.from && (
          <p
            style={{
              color: secondaryThemeColor,
              fontSize: ".85rem",
              textAlign: "center",
              fontWeight: 500,
              margin: 0,
              marginBottom: "1.5rem",
            }}
          >
            Чтобы пройти дальше вам, необходимо авторизоваться
          </p>
        )}

        <div className={classes.actions}>
          <ZeusButton>Войти</ZeusButton>
          <Link className={classes.link}>Нет аккаунта? Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
