import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import products from "../../store/products";
import Item from "./components/Item";
import Filters from "./Filters";
import TopToolbar from "./TopToolbar";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "375px 1fr",
    gridGap: "10px",

    "@media (max-width: 850px)": {
      gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
    },
  },
  gridPhones: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gridAutoRows: "min-content",
    gridGap: "10px",
  },
});

const Catalog = () => {
  const classes = useStyles();
  const [showType, setShowType] = useState("Row");

  useEffect(() => {
    const getKey = localStorage.getItem("showTypeMarket");

    if (getKey) {
      setShowType(getKey);
    }
  }, []);

  const mapFakeOptions = products.items.map((phone) => {
    return <Item key={phone.id} showType={showType} phone={phone} />;
  });

  return (
    <div className={classes.root}>
      <h1>Смартфоны</h1>

      <TopToolbar showType={showType} setShowType={setShowType} />

      <div className={classes.content}>
        <Filters />

        <div className={showType === "Grid" ? classes.gridPhones : null}>
          {mapFakeOptions}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
