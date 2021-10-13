import { LinearProgress, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { Suspense, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { secondaryThemeColor } from "./../../../../helpers/colors";
import { useRequireAuth } from "./../../../../hooks/useRequireAuth";
import SwitchRoutes from "./../../../../routing/SwitchRoutes";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
    padding: "10px 15px",
    fontFamily: "'Montserrat', sans-serif",
    borderRadius: "1rem",
  },
  indicator: {
    backgroundColor: secondaryThemeColor,
  },
});

const Profile = ({ routes }) => {
  useRequireAuth(["Client"]);
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
        <Tab label="Данные профиля" value="/client/profile" />
        <Tab label="Мои заказы" value="/client/profile/orders" />
      </Tabs>

      <Suspense fallback={<LinearProgress />}>
        <SwitchRoutes routes={routes} />
      </Suspense>
    </>
  );
};

export default Profile;
