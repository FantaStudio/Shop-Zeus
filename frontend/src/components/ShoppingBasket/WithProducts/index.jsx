import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import { is } from "./../../../helpers/is";
import auth from "./../../../store/auth";
import ZeusButton from "./../../System/ZeusButton";
import Item from "./components/Item";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
  },
  phonesList: {
    flex: 1,
    minWidth: 600,
  },
  total: {
    minWidth: 250,
    marginLeft: "1rem",
    padding: "10px 15px",
    backgroundColor: "#fff",
    borderRadius: "1rem",
    height: "min-content",
    minHeight: 150,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  boldText: {
    marginLeft: ".8rem",
    fontSize: "1.2rem",
  },
  blockText: {
    whiteSpace: "nowrap",
  },
  btnBlock: {
    display: "flex",
    justifyContent: "center",
    marginTop: 14,
  },
});

const WithProducts = view(() => {
  const classes = useStyles();

  const mapPhones = auth.productsInBasket.map((item) => {
    return <Item phone={item} key={item?.id} />;
  });

  const total = auth.productsInBasket.reduce((prev, next) => {
    if (is(Object, prev)) {
      return prev?.price + next?.price;
    }

    return prev + next?.price;
  });

  return (
    <div className={classes.root}>
      <div className={classes.phonesList}>{mapPhones}</div>
      <div className={classes.total}>
        <div>
          <p className={classes.blockText}>
            Количество товара:{" "}
            <b className={classes.boldText}>
              {auth.productsInBasket.length} шт.
            </b>
          </p>

          <Divider />

          <p className={classes.blockText}>
            Итоговая сумма:{" "}
            <b className={classes.boldText}>
              ₽ {is(Object, total) ? total?.price : total}
            </b>
          </p>

          <Divider />

          <div className={classes.btnBlock}>
            <ZeusButton>Оформить заказ</ZeusButton>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WithProducts;
