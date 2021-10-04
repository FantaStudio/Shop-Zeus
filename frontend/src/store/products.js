import { store } from "@risingstack/react-easy-state";

const products = store({
  loading: false,
  manufacturesVariables: [
    "Apple",
    "BQ",
    "DEXP",
    "Samsung",
    "Xiaomi",
    "Huawei",
    "HONOR",
    "OPPO",
  ],
  releaseVariables: ["2018", "2019", "2020", "2021"],
  builtInMemoryVariables: [
    "8 Гб",
    "16 Гб",
    "32 Гб",
    "64 Гб",
    "128 Гб",
    "256 Гб",
    "512 Гб",
  ],
  ramSizeVariables: [
    "1 Гб",
    "2 Гб",
    "3 Гб",
    "4 Гб",
    "6 Гб",
    "8 Гб",
    "12 Гб",
    "16 Гб",
  ],
  items: [],
  pages: 1,
  params: {
    page: 1,
    perPage: 30,
    sortBy: "price",
    sortDirection: "asc",
    search: undefined,
    haveInMarket: "inStock",
    fromPrice: undefined,
    toPrice: undefined,
    manufacturers: [],
    releases: [],
    builtInMemory: [],
    ramSize: [],
    haveNfc: "",
  },
});

export default products;
