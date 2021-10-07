const { lazy } = require("react");

const ProfileMain = lazy(() => import("../../components/Roles/Client/Profile"));

const ProfileInformation = lazy(() =>
  import("../../components/Roles/Client/Profile/Information")
);

const ProfileOrders = lazy(() =>
  import("../../components/Roles/Client/Profile/Orders")
);

export const Profile = [
  {
    path: "/profile",
    component: ProfileMain,
    routes: [
      {
        path: "/profile/orders",
        component: ProfileOrders,
      },
      {
        path: "/profile",
        component: ProfileInformation,
      },
    ],
  },
];
