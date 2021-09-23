import { Container, LinearProgress } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React, { Suspense } from "react";
import { theme } from "../theme";

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Suspense fallback={<LinearProgress />}>
          {/*  <MakeRoutes routes={Schema} /> */}
        </Suspense>
      </Container>
    </ThemeProvider>
  );
};

export default Root;
