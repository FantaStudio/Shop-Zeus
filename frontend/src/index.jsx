import { LinearProgress } from "@material-ui/core";
import { StylesProvider } from "@material-ui/styles";
import React, { Suspense } from "react";
import { render } from "react-dom";
import { Router } from "react-router-dom";
import Browser from "./components/Browser";
import Root from "./components/Root";
import { history } from "./historyInstance";

let isAsync = true;

try {
  // eslint-disable-next-line no-empty-function
  const a = async () => {};
  isAsync = a.constructor.name === "AsyncFunction";
} catch (e) {
  isAsync = false;
}

render(
  isAsync ? (
    <Router history={history}>
      <StylesProvider>
        <Suspense fallback={<LinearProgress />}>
          <Root />
        </Suspense>
      </StylesProvider>
    </Router>
  ) : (
    <Browser />
  ),
  document.getElementById("root")
);
