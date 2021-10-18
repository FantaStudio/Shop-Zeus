import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useEffect, useState } from "react";
import orders from "../../../../../store/orders";
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetcher = useCallback(async () => {
    setLoading(true);

    const result = await orders.fetchOrders();

    if (result) {
      setData(result);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  const mapsItems = data.map((item) => {
    return <Item key={item?.productId} phone={item} />;
  });

  return (
    <div className={classes.root}>
      {loading && <LinearProgress />}

      <div className={classes.block}>{mapsItems}</div>
    </div>
  );
};

export default Orders;
