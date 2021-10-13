import { makeStyles } from "@material-ui/core/styles";
import { view } from "@risingstack/react-easy-state";
import React, { useCallback, useEffect } from "react";
import products from "../../../store/products";
import SearchField from "../../System/SearchField";
import { useDebounce } from "./../../../hooks/useDebounce";
import CustomRadioButtons from "./../../System/CustomRadioButtons";
import BlockBuiltInMemory from "./BlockBuiltInMemory";
import BlockManufactures from "./BlockManufactures";
import BlockPrice from "./BlockPrice";
import BlockRamSize from "./BlockRamSize";
import BlockRelease from "./BlockRelease";
import CollapsingBlock from "./components/CollapsingBlock";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
    borderRadius: "1rem",
    padding: ".8rem",
  },
});

const optionsHaveInMarket = [
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
    value: "",
  },
];

const optionsHaveNFC = [
  {
    label: "Все",
    value: "",
  },
  {
    label: "Есть",
    value: "Yes",
  },
  {
    label: "Нету",
    value: "No",
  },
];

const WatchChangeFilters = view(() => {
  const {
    search,
    haveInMarket,
    manufacturers,
    fromPrice,
    toPrice,
    releases,
    builtInMemory,
    ramSize,
    haveNfc,
    sortBy,
    sortDirection,
  } = products.params;

  const debouncedFromPrice = useDebounce(fromPrice, 500);
  const debouncedToPrice = useDebounce(toPrice, 500);

  useEffect(() => {
    console.log(
      search,
      haveInMarket,
      manufacturers,
      debouncedFromPrice,
      debouncedToPrice,
      releases,
      builtInMemory,
      ramSize,
      haveNfc,
      sortBy,
      sortDirection
    );
  }, [
    debouncedFromPrice,
    debouncedToPrice,
    haveInMarket,
    manufacturers,
    search,
    releases,
    builtInMemory,
    ramSize,
    haveNfc,
    sortBy,
    sortDirection,
  ]);

  return null;
});

const Filters = view(() => {
  const classes = useStyles();

  const onSearch = useCallback((search) => {
    products.params.search = search;
    products.params.page = 1;
  }, []);

  return (
    <>
      <WatchChangeFilters />

      <div className={classes.root}>
        <SearchField
          defaultValue={products.params.search}
          onSearch={onSearch}
        />

        <CollapsingBlock title="Наличие в магазинах">
          <div>
            <CustomRadioButtons
              value={products.params.haveInMarket || ""}
              onChange={(e, value) => (products.params.haveInMarket = value)}
              items={optionsHaveInMarket}
            />
          </div>
        </CollapsingBlock>

        <CollapsingBlock title="Цена">
          <BlockPrice />
        </CollapsingBlock>

        <CollapsingBlock title="Производитель">
          <BlockManufactures />
        </CollapsingBlock>

        <CollapsingBlock title="Год релиза" initialState={false}>
          <BlockRelease />
        </CollapsingBlock>

        <CollapsingBlock title="Объем встроенной памяти" initialState={false}>
          <BlockBuiltInMemory />
        </CollapsingBlock>

        <CollapsingBlock title="Объем оперативной памяти" initialState={false}>
          <BlockRamSize />
        </CollapsingBlock>

        <CollapsingBlock title="NFC" initialState={false}>
          <div>
            <CustomRadioButtons
              value={products.params.haveNfc || ""}
              onChange={(e, value) => (products.params.haveNfc = value)}
              items={optionsHaveNFC}
            />
          </div>
        </CollapsingBlock>
      </div>
    </>
  );
});

export default Filters;
