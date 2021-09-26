import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { Suspense } from "react";
import { Routes } from "../routing/Routes";
import SwitchRoutes from "../routing/SwitchRoutes";
import Footer from "./Footer";
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
      padding: "15px 20px",
      position: "fixed",
      width: "100%",
    },
    footer: {
      backgroundColor: "#333",
      padding: "15px 20px",
      borderRadius: "1.6rem 1.6rem 0 0",
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
    "#root": {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      height: "100vh",
    },
    "#main-content": {
      width: 1600,
      margin: "0 auto",

      "@media (max-width: 1824px)": {
        width: 1400,
      },

      "@media (max-width: 1624px)": {
        width: 1200,
      },

      "@media (max-width: 1424px)": {
        width: 1000,
      },

      "@media (max-width: 1224px)": {
        width: 800,
      },

      "@media (max-width: 1024px)": {
        width: 600,
      },

      "@media (max-width: 768px)": {
        width: "100%",
      },

      "@media (max-width: 320px)": {
        width: "100%",
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

  return (
    <>
      <Header />

      <main id="main-content">
        <Suspense fallback={<LinearProgress />}>
          <SwitchRoutes routes={Routes} />
        </Suspense>
      </main>

      <Footer />
    </>
  );
};

export default Root;
