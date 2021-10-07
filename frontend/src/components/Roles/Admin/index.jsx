import { LinearProgress } from "@material-ui/core";
import React, { Suspense } from "react";
import { useRequireAuth } from "./../../../hooks/useRequireAuth";
import SwitchRoutes from "./../../../routing/SwitchRoutes";

const Admin = ({ routes }) => {
  useRequireAuth(["Admin"]);

  return (
    <Suspense fallback={<LinearProgress />}>
      <SwitchRoutes routes={routes} />
    </Suspense>
  );
};

export default Admin;
