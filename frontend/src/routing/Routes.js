const { lazy } = require("react");

const Catalog = lazy(() => import("../components/Catalog"));

const Login = lazy(() => import("../components/Auth/Login"));

export const Routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Catalog,
  },
];
