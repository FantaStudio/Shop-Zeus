const { lazy } = require("react");

const Main = lazy(() => import("../../components/Roles/Admin"));

const AllClients = lazy(() =>
  import("../../components/Roles/Admin/AllClients")
);

const AllOrders = lazy(() => import("../../components/Roles/Admin/AllOrders"));

const AllProducts = lazy(() =>
  import("../../components/Roles/Admin/AllProducts")
);

export const Admin = [
  {
    path: "/admin",
    component: Main,
    routes: [
      {
        path: "/admin/all-clients",
        component: AllClients,
      },
      {
        path: "/admin/all-orders",
        component: AllOrders,
      },
      {
        path: "/admin/all-products",
        component: AllProducts,
      },
    ],
  },
];
