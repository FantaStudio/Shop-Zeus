import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Item from "./components/Item";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
    width: "100%",
    height: "100%",
  },
  block: {
    minWidth: 600,
  },
});

const Orders = () => {
  const classes = useStyles();
  const orders = [
    {
      id: 1,
      name: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      price: 2000,
      imageHref: "/images/phone.jpg",
      execute: false,
    },
    {
      id: 2,
      name: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      price: 3000,
      imageHref: "/images/phone.jpg",
      execute: false,
    },
    {
      id: 3,
      name: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      price: 4000,
      imageHref: "/images/phone.jpg",
      execute: true,
    },
  ];

  const mapsItems = orders.map((item) => {
    return <Item key={item?.id} phone={item} />;
  });

  return (
    <div className={classes.root}>
      <div className={classes.block}>{mapsItems}</div>
    </div>
  );
};

export default Orders;
