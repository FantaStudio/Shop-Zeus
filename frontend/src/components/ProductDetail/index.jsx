import React from "react";
import { useRouteMatch } from "react-router-dom";

const ProductDetail = () => {
  const match = useRouteMatch();

  console.log(match.params?.id);

  return <div></div>;
};

export default ProductDetail;
