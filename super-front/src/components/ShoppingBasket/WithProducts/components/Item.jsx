import { makeStyles } from "@material-ui/core/styles";
import { Delete } from "@material-ui/icons";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import { Link } from "react-router-dom";
import { secondaryThemeColor } from "../../../../helpers/colors";
import auth from "./../../../../store/auth";

const useStyles = makeStyles({
  root: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: "1rem",
    padding: "10px 15px",
    marginBottom: "1rem",
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

  priceBlock: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },

  price: {
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  icon: {
    color: secondaryThemeColor,
    fontSize: "2rem",
    marginLeft: "1rem",
    cursor: "pointer",
  },
});

const Item = view(({ phone }) => {
  const classes = useStyles();

  const deleteItem = () => {
    auth.productsInBasket = auth.productsInBasket.filter((item) => {
      return item?.id !== phone?.id;
    });
  };

  return (
    <div className={classes.root}>
      <div>
        <img src={phone?.imageHref} className={classes.image} />
      </div>
      <div className={classes.nameBlock}>
        <p>
          <Link
            to={`/phone/${phone?.id}`}
            style={{ color: secondaryThemeColor }}
          >
            {phone?.name}
          </Link>{" "}
        </p>
      </div>

      <div className={classes.priceBlock}>
        <div>
          <p className={classes.price}>
            <b>{`₽ ${phone?.price}`}</b>
          </p>
        </div>

        <div>
          <Delete onClick={deleteItem} className={classes.icon} />
        </div>
      </div>
    </div>
  );
});

export default Item;
