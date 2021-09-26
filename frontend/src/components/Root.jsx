import { LinearProgress } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React, { Suspense } from "react";
import { Routes } from "../routing/Routes";
import SwitchRoutes from "../routing/SwitchRoutes";
import { theme } from "../theme";
import Footer from "./Footer";
import Header from "./Header";

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />

      <Suspense fallback={<LinearProgress />}>
        <SwitchRoutes routes={Routes} />
      </Suspense>

      <Footer />
    </ThemeProvider>
  );
};

export default Root;
