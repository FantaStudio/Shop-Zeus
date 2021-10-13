import { makeStyles } from "@material-ui/core/styles";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import auth from "./../../store/auth";
import WithoutProducts from "./WithoutProducts";
import WithProducts from "./WithProducts";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
});

const ShoppingBasket = view(() => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Корзина</h1>

      {auth?.productsInBasket?.length > 0 ? (
        <WithProducts />
      ) : (
        <WithoutProducts />
      )}
    </div>
  );
});

export default ShoppingBasket;
