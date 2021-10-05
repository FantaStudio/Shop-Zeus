const { lazy } = require("react");

const Catalog = lazy(() => import("../components/Catalog"));

const Login = lazy(() => import("../components/Auth/Login"));

const ProductDetail = lazy(() => import("../components/ProductDetail"));

const ShoppingBasket = lazy(() => import("../components/ShoppingBasket"));

export const Routes = [
  {
    path: "/phone/:id",
    component: ProductDetail,
  },
  {
    path: "/shopping-basket",
    component: ShoppingBasket,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Catalog,
  },
];
