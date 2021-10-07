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

const Item = ({ phone }) => {
  const classes = useStyles();

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

        <div
          style={{ display: "flex", alignItems: "center" }}
          className={phone?.execute ? classes.done : classes.notDone}
        >
          {phone?.execute ? (
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
    </div>
  );
};

export default Item;
