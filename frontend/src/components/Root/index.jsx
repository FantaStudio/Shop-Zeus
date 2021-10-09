import { DialogActions, LinearProgress } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { view } from "@risingstack/react-easy-state";
import React, { Suspense, useEffect } from "react";
import { Routes } from "../../routing/Routes";
import SwitchRoutes from "../../routing/SwitchRoutes";
import auth from "../../store/auth";
import ZeusButton from "../System/ZeusButton";
import { mainThemeColor, secondaryThemeColor } from "./../../helpers/colors";
import ui from "./../../store/ui";
import Alert from "./../System/Alert";
import Header from "./Header";

const useStyles = makeStyles({
  "@global": {
    body: {
      margin: 0,
      minWidth: 400,
      overflowY: "auto",
      fontFamily: "'Montserrat', sans-serif !important",
      backgroundColor: mainThemeColor,
    },
    header: {
      backgroundColor: "#fff",
      padding: ".7rem 0rem",
      position: "sticky",
      width: "100%",
      top: 0,
      marginBottom: "1rem",
      zIndex: 100,
    },

    html: {
      margin: 0,
    },
    b: {
      fontWeight: 700,
    },
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    main: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      height: "100vh",
    },
    img: {
      maxWidth: "100%",
    },
    "#component-error-text": {
      color: "red",
    },
    ".MuiOutlinedInput-input": {
      padding: ".7rem .4rem",
    },
    ".MuiBadge-colorPrimary": {
      backgroundColor: secondaryThemeColor,
    },
    ".MuiRadio-colorSecondary.Mui-checked": {
      color: secondaryThemeColor,
    },
    ".MuiCheckbox-colorSecondary.Mui-checked": {
      color: secondaryThemeColor,
    },
    ".MuiFormHelperText-root.Mui-error": {
      color: red[600],
      fontWeight: 700,
      fontFamily: "'Montserrat', sans-serif",
    },
    "#root": {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      height: "100vh",
    },
    "#main-content": {
      width: 1400,
      margin: "0 auto",

      "@media (max-width: 1824px)": {
        width: 1200,
      },

      "@media (max-width: 1624px)": {
        width: 1100,
      },

      "@media (max-width: 1424px)": {
        width: 900,
      },

      "@media (max-width: 1024px)": {
        width: 800,
      },

      "@media (max-width: 850px)": {
        width: "95%",
      },
    },
    a: {
      cursor: "pointer",
      fontWeight: 600,
      transition: "all .2s ease",
      textDecoration: "none",
      letterSpacing: "0.04em",
      color: secondaryThemeColor,
    },
  },
});

const SyncShoppingBasket = view(() => {
  const { productsInBasket } = auth;

  useEffect(() => {
    const getKey = localStorage.getItem("basketProductsZeus");

    if (getKey) {
      auth.productsInBasket = JSON.parse(getKey);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(productsInBasket);

    localStorage.setItem("basketProductsZeus", json);
  }, [productsInBasket]);

  return null;
});

const GlobalSuccessOrder = view(() => {
  const customClose = () => {
    auth.productsInBasket = [];
    ui.openSuccessOrderDialog = false;
  };

  return (
    <Alert
      open={ui.openSuccessOrderDialog}
      customClose={customClose}
      content={
        <>
          <p>
            Ваш заказ принят и обрабатывается. За статусом заказа мы можете
            наблюдать во вкладке профиля &apos;Мои заказы&apos;
          </p>

          <DialogActions>
            <ZeusButton onClick={customClose}>Окей</ZeusButton>
          </DialogActions>
        </>
      }
      customTitle="Заказ успешно оформлен"
      size="xs"
      hideCloseBtn
    />
  );
});

const Root = () => {
  useStyles();

  return (
    <>
      <Header />

      <SyncShoppingBasket />

      <GlobalSuccessOrder />

      <main id="main-content">
        <Suspense fallback={<LinearProgress />}>
          <SwitchRoutes routes={Routes} />
        </Suspense>
      </main>
    </>
  );
};

export default Root;
