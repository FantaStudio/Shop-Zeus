import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Routes } from "../../routing/Routes";
import SwitchRoutes from "../../routing/SwitchRoutes";
import { secondaryThemeColor } from "./../../helpers/colors";
import Header from "./Header";

const useStyles = makeStyles({
  "@global": {
    body: {
      margin: 0,
      minWidth: 320,
      overflowY: "auto",
      fontFamily: "'Montserrat', sans-serif",
      backgroundColor: "#f1f1f5",
    },
    header: {
      backgroundColor: "#fff",
      padding: ".7rem 0rem",
      position: "sticky",
      width: "100%",
      top: 0,
      marginBottom: "1rem",
      zIndex: 999999,
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
      fontWeight: 500,
      transition: "all .2s ease",
      textDecoration: "none",
      letterSpacing: "0.04em",
    },
  },
});

const Root = () => {
  useStyles();
  const location = useLocation();

  /* Zeus  */

  /* Для элементов формы (кнопки, например) использоваться лазурный цвет ,hex: #007fff */

  return (
    <>
      <Header />

      <main id="main-content">
        <Suspense fallback={<LinearProgress />}>
          <SwitchRoutes routes={Routes} />
        </Suspense>
      </main>
    </>
  );
};

export default Root;
