import { store } from "@risingstack/react-easy-state";

const products = store({
  loading: false,
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
    manufacturer: undefined,
    release: undefined,
  },
});

export default products;
