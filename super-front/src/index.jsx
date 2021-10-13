import { LinearProgress } from "@material-ui/core";
import { StylesProvider } from "@material-ui/styles";
import React, { Suspense } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Root from "./components/Root";
import ErrorHandler from "./ErrorHandler";

render(
  <Router>
    <StylesProvider>
      <Suspense fallback={<LinearProgress />}>
        <ErrorHandler>
          <Root />
        </ErrorHandler>
      </Suspense>
    </StylesProvider>
  </Router>,
  document.getElementById("root")
);
