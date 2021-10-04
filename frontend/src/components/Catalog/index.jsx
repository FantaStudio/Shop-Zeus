import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
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
    display: "flex",
    flexFlow: "row wrap",
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

  return (
    <div className={classes.root}>
      <h1>Смартфоны</h1>

      <TopToolbar showType={showType} setShowType={setShowType} />

      <div className={classes.content}>
        <Filters />
      </div>
    </div>
  );
};

export default Catalog;
