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

      <Suspense fallback={<LinearProgress />}>
        <SwitchRoutes routes={Routes} />
      </Suspense>

      <Footer />
    </>
  );
};

export default Root;
