import { makeStyles } from "@material-ui/core/styles";
import { ShoppingBasket } from "@material-ui/icons";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { secondaryThemeColor } from "./../../../helpers/colors";
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

const Item = memo(({ showType, phone }) => {
  const classes = useStyles();

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
                fontSize="large"
                style={{
                  marginLeft: ".5rem",
                  color: secondaryThemeColor,
                  cursor: "pointer",
                }}
              />
            )}
          </p>

          {showType !== "Grid" && <ZeusButton>Купить</ZeusButton>}
        </div>
      </div>
    </div>
  );
});

export default Item;
