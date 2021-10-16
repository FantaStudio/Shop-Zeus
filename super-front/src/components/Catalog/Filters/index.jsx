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
    page,
    perPage,
    search,
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
    const makeParams = {
      page,
      perPage,
      search,
      manufacturers: manufacturers.join(","),
      fromPrice: debouncedFromPrice,
      toPrice: debouncedToPrice,
      releases: releases.join(","),
      builtInMemory: builtInMemory.join(","),
      ramSize: ramSize.join(","),
      haveNfc,
      sortBy,
      sortDirection,
    };

    products.fetchProducts(makeParams);
  }, [
    page,
    perPage,
    debouncedFromPrice,
    debouncedToPrice,
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
