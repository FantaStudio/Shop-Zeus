import { green, orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Check, Warning } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { secondaryThemeColor } from "./../../../../../../helpers/colors";

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
    display: "flex",
    alignItems: "center",
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
  done: {
    color: green[600],
  },
  notDone: {
    color: orange[600],
  },
  text: {
    fontSize: "1em",
    fontWeight: 700,
    marginLeft: ".5rem",
  },
  iconExecute: {
    fontSize: "2rem",
    marginLeft: "1rem",
  },
});

const Item = ({ order }) => {
  const classes = useStyles();

  const mapPhones = (order?.products || [])?.map((phone) => {
    return (
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <div key={phone?.productId}>
          <img src={phone?.imageHref} alt="" className={classes.image} />
        </div>

        <div className={classes.nameBlock}>
          <p>
            <Link
              to={`/phone/${phone?.productId}`}
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
        </div>
      </div>
    );
  });

  return (
    <div className={classes.root}>
      <div style={{ marginRight: "1.5rem" }}>{mapPhones}</div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className={order?.execute ? classes.done : classes.notDone}
      >
        {order?.execute ? (
          <>
            <Check className={classes.iconExecute} />
            <span className={classes.text}>Доставлено</span>
          </>
        ) : (
          <>
            <Warning className={classes.iconExecute} />
            <span className={classes.text}>Доставляется...</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Item;
