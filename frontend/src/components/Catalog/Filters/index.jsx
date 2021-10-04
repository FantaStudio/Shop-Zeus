import { makeStyles } from "@material-ui/core/styles";
import { view } from "@risingstack/react-easy-state";
import React, { useCallback, useState } from "react";
import products from "../../../store/products";
import SearchField from "../../System/SearchField";
import { useDebounce } from "./../../../hooks/useDebounce";
import CustomCheckboxLabel from "./../../System/CustomCheckboxLabel";
import CustomRadioButtons from "./../../System/CustomRadioButtons";
import CustomTextField from "./../../System/CustomTextField";
import CollapsingBlock from "./components/CollapsingBlock";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    width: "100%",
    height: "min-content",
    backgroundColor: "#fff",
    borderRadius: "1rem",
    padding: ".8rem",
  },
});

const options = [
  {
    label: "В наличие",
    value: "inStock",
  },
  {
    label: "В наличие и под заказ",
    value: "inStockAndUnderOrder",
  },
  {
    label: "Все товары включая отсутствующие в продаже",
    value: "All",
  },
];

const Filters = view(() => {
  const classes = useStyles();
  const [fromPrice, setFromPrice] = useState(products.params.fromPrice || "");
  const [toPrice, setToPrice] = useState(products.params.toPrice || "");

  const debouncedFromPrice = useDebounce(fromPrice, 500);
  const debouncedToPrice = useDebounce(toPrice, 500);

  const { search, haveInMarket, manufacturer } = products.params;

  const onSearch = useCallback((search) => {
    products.params.search = search;
    products.params.page = 1;
  }, []);

  const mapCheckboxes = products.manufactures.map((item) => {
    return (
      <div key={item}>
        <CustomCheckboxLabel
          checked={manufacturer.includes(item)}
          label={item}
          onChange={(e, checked) => {
            if (checked) {
              products.params.manufacturer = [
                ...products.params.manufactures,
                item,
              ];
            } else {
              products.params.manufacturer.filter((m) => m !== item);
            }
          }}
        />
      </div>
    );
  });

  return (
    <div className={classes.root}>
      <SearchField defaultValue={search} onSearch={onSearch} />

      <CollapsingBlock title="Наличие в магазинах">
        <div>
          <CustomRadioButtons
            value={haveInMarket || "inStock"}
            onChange={(e, value) => (products.params.haveInMarket = value)}
            items={options}
          />
        </div>
      </CollapsingBlock>

      <CollapsingBlock title="Цена">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: ".3rem",
          }}
        >
          <div style={{ width: 150 }}>
            <CustomTextField
              value={fromPrice}
              placeholder="От"
              onChange={(e, value) => setFromPrice(value)}
              fullWidth
            />{" "}
          </div>

          <div style={{ width: 150 }}>
            <CustomTextField
              value={toPrice}
              placeholder="До"
              onChange={(e, value) => setToPrice(value)}
              fullWidth
            />
          </div>
        </div>
      </CollapsingBlock>

      <CollapsingBlock title="Производитель">
        <div>{mapCheckboxes}</div>
      </CollapsingBlock>

      <CollapsingBlock title="Год релиза">
        <div>11</div>
      </CollapsingBlock>

      <CollapsingBlock title="Объем встроенной памяти">
        <div>11</div>
      </CollapsingBlock>

      <CollapsingBlock title="Объем оперативной памяти">
        <div>11</div>
      </CollapsingBlock>

      <CollapsingBlock title="NFC">
        <div>11</div>
      </CollapsingBlock>
    </div>
  );
});

export default Filters;
