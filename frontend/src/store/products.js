import { store } from "@risingstack/react-easy-state";

const products = store({
  loading: false,
  manufactures: [
    "Apple",
    "BQ",
    "DEXP",
    "Samsung",
    "Xiaomi",
    "Huawei",
    "HONOR",
    "OPPO",
  ],
  items: [],
  pages: 1,
  params: {
    page: 1,
    perPage: 30,
    sortBy: undefined,
    sortDirection: undefined,
    search: undefined,
    haveInMarket: undefined,
    fromPrice: undefined,
    toPrice: undefined,
    manufacturer: [],
    release: undefined,
    builtInMemory: undefined,
    ramSize: undefined,
    haveNfc: undefined,
  },
});

export default products;
