import React from "react";
import { Route, Switch } from "react-router-dom";

const SwitchRoutes = ({ routes }) => {
  const mapRoutes = (routes || []).map((route) => {
    return <Route key={route?.path} {...route} />;
  });

  return <Switch>{mapRoutes}</Switch>;
};

export default SwitchRoutes;
