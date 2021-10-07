const { lazy } = require("react");

const Catalog = lazy(() => import("../components/Catalog"));

const Login = lazy(() => import("../components/Auth/Login"));

const ProductDetail = lazy(() => import("../components/ProductDetail"));

const ShoppingBasket = lazy(() => import("../components/ShoppingBasket"));

const Checkout = lazy(() => import("../components/Roles/Client/Checkout"));

export const Routes = [
  {
    path: "/client/checkout",
    component: Checkout,
  },
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
