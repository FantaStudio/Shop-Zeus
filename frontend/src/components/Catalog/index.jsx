import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
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
  },
  gridPhones: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gridAutoRows: "min-content",
    gridGap: "10px",
  },
});

const fakeOptions = [
  {
    id: 1,
    name: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    price: 2000,
    imageHref: "/images/phone.jpg",
  },
  {
    id: 2,
    name: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    price: 3000,
    imageHref: "/images/phone.jpg",
  },
  {
    id: 3,
    name: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    price: 4000,
    imageHref: "/images/phone.jpg",
  },
  {
    id: 4,
    name: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    price: 10000,
    imageHref: "/images/phone.jpg",
  },
  {
    id: 5,
    name: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    price: 12000,
    imageHref: "/images/phone.jpg",
  },
];

const Catalog = () => {
  const classes = useStyles();
  const [showType, setShowType] = useState("Row");

  useEffect(() => {
    const getKey = localStorage.getItem("showTypeMarket");

    if (getKey) {
      setShowType(getKey);
    }
  }, []);

  const mapFakeOptions = fakeOptions.map((phone) => {
    return <Item key={phone.id} showType={showType} phone={phone} />;
  });

  return (
    <div className={classes.root}>
      <h1>Смартфоны</h1>

      <TopToolbar showType={showType} setShowType={setShowType} />

      <div className={classes.content}>
        <Filters />

        <div className={showType === "Grid" && classes.gridPhones}>
          {mapFakeOptions}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
