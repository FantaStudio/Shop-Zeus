import { makeStyles } from "@material-ui/core/styles";
import { ShoppingBasket } from "@material-ui/icons";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { secondaryThemeColor } from "./../../../helpers/colors";
import auth from "./../../../store/auth";
import ZeusButton from "./../../System/ZeusButton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: "1rem",
    padding: "10px 15px",
    marginBottom: "1rem",
    alignItems: "center",
  },
  gridMode: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: "1rem",
    padding: 5,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: "auto",
  },
  nameBlock: {
    marginLeft: "1rem",
    wordBreak: "break-word",
    maxWidth: 750,
    width: "100%",
  },
  nameBlockGrid: {
    wordBreak: "break-word",
    maxWidth: 300,
    width: "100%",
  },
  priceBlock: {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
  },
  priceBlockGrid: {
    display: "flex",
  },
  price: {
    textAlign: "center",
  },
  priceGrid: {
    display: "flex",
    alignItems: "center",
    margin: 0,
  },
});

const Item = view(({ showType, phone }) => {
  const classes = useStyles();
  const history = useHistory();

  const inInsideBasket = auth.productsInBasket.some(
    (item) => item?.id === phone?.id
  );

  return (
    <div className={showType === "Grid" ? classes.gridMode : classes.root}>
      <div>
        <img src={phone?.imageHref} className={classes.image} />
      </div>
      <div
        className={
          showType === "Grid" ? classes.nameBlockGrid : classes.nameBlock
        }
      >
        <p style={showType === "Grid" ? { margin: 3 } : {}}>
          <Link
            to={`/phone/${phone?.id}`}
            style={{ color: secondaryThemeColor }}
          >
            {phone?.name}
          </Link>{" "}
        </p>
      </div>

      <div
        className={
          showType === "Grid" ? classes.priceBlockGrid : classes.priceBlock
        }
      >
        <div>
          <p
            className={showType === "Grid" ? classes.priceGrid : classes.price}
          >
            <b>{`₽ ${phone?.price}`}</b>
            {showType === "Grid" && (
              <ShoppingBasket
                onClick={() => {
                  if (!inInsideBasket) {
                    auth.productsInBasket = [...auth.productsInBasket, phone];
                  } else {
                    history.push("/shopping-basket");
                  }
                }}
                fontSize="large"
                style={{
                  marginLeft: ".5rem",
                  color: secondaryThemeColor,
                  cursor: "pointer",
                }}
              />
            )}
          </p>

          {showType !== "Grid" && (
            <ZeusButton
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                if (!inInsideBasket) {
                  auth.productsInBasket = [...auth.productsInBasket, phone];
                } else {
                  history.push("/shopping-basket");
                }
              }}
            >
              {inInsideBasket ? "В корзине" : "Купить"}{" "}
            </ZeusButton>
          )}
        </div>
      </div>
    </div>
  );
});

export default Item;
