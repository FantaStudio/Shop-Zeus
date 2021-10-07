import { LinearProgress, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { Suspense, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { secondaryThemeColor } from "../../../helpers/colors";
import { useRequireAuth } from "./../../../hooks/useRequireAuth";
import SwitchRoutes from "./../../../routing/SwitchRoutes";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
    padding: "10px 15px",
    borderRadius: "1rem",
    fontFamily: "'Montserrat', sans-serif",
  },
  indicator: {
    backgroundColor: secondaryThemeColor,
  },
});

const Admin = ({ routes }) => {
  useRequireAuth(["Admin"]);
  const classes = useStyles();

  const location = useLocation();
  const history = useHistory();

  const [value, setValue] = useState(location.pathname + location.search);

  const valuePathname = value?.split("?")?.[0];

  const finder = location.pathname === valuePathname ? value : false;

  return (
    <>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        className={classes.root}
        value={finder}
        classes={{
          indicator: classes.indicator,
        }}
        onChange={(event, value) => {
          history.push(value);
          setValue(value);
        }}
      >
        <Tab label="Клиенты" value="/admin/all-clients" />
        <Tab label="Заказы" value="/admin/all-orders" />
        <Tab label="Продукты" value="/admin/all-products" />
      </Tabs>

      <Suspense fallback={<LinearProgress />}>
        <SwitchRoutes routes={routes} />
      </Suspense>
    </>
  );
};

export default Admin;
