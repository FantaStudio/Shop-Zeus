const { lazy } = require("react");

const Main = lazy(() => import("../../components/Roles/Admin"));

const AllClients = lazy(() =>
  import("../../components/Roles/Admin/AllClients")
);

const AllOrders = lazy(() => import("../../components/Roles/Admin/AllOrders"));

const AllProducts = lazy(() =>
  import("../../components/Roles/Admin/AllProducts")
);

const ProductDetailMain = lazy(() =>
  import("../../components/Roles/Admin/AllProducts/Product")
);

const ProductDetailInfo = lazy(() =>
  import("../../components/Roles/Admin/AllProducts/Product/ProductInformation")
);

const ProductDetailEdit = lazy(() =>
  import("../../components/Roles/Admin/AllProducts/Product/ProductEditable")
);

const CreateProduct = lazy(() =>
  import("../../components/Roles/Admin/AllProducts/CreateProduct")
);

export const Admin = [
  {
    path: "/admin",
    component: Main,
    routes: [
      {
        path: "/admin/all-products/create",
        component: CreateProduct,
      },
      {
        path: "/admin/all-products/:id",
        component: ProductDetailMain,
        routes: [
          {
            path: "/admin/all-products/:id/edit",
            component: ProductDetailEdit,
          },
          {
            path: "/admin/all-products/:id",
            component: ProductDetailInfo,
          },
        ],
      },

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
