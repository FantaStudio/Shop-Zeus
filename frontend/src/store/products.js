import { store } from "@risingstack/react-easy-state";

const products = store({
  loading: false,
  items: [],
  pages: 1,
});

export default products;
