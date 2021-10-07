import { LinearProgress } from "@material-ui/core";
import React, { memo, Suspense } from "react";
import SwitchRoutes from "./../../../../../routing/SwitchRoutes";

const Product = memo(({ routes }) => {
  return (
    <Suspense fallback={<LinearProgress />}>
      <SwitchRoutes routes={routes} />
    </Suspense>
  );
});

export default Product;
