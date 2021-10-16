import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { view } from "@risingstack/react-easy-state";
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

const Catalog = view(() => {
  const classes = useStyles();
  const [showType, setShowType] = useState("Row");

  useEffect(() => {
    const getKey = localStorage.getItem("showTypeMarket");

    if (getKey) {
      setShowType(getKey);
    }
  }, []);

  const mapOptions = products.items.map((phone) => {
    return <Item key={phone._id} showType={showType} phone={phone} />;
  });

  const onChangePagination = (e, page) => {
    products.params.page = page;
  };

  return (
    <div className={classes.root}>
      <h1>Смартфоны</h1>

      <TopToolbar showType={showType} setShowType={setShowType} />

      <div className={classes.content}>
        <Filters />

        <div>
          {products.loading && <LinearProgress />}

          <div className={showType === "Grid" ? classes.gridPhones : null}>
            {mapOptions}
          </div>

          {products?.pages > 1 && (
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={products.pages}
                page={products.params.page}
                onChange={onChangePagination}
                size="large"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Catalog;
