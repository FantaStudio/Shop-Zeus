import { store } from "@risingstack/react-easy-state";
import { endpoints } from "../endpoints";
import { get, patch, post, showError } from "./../api/index";

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
  releaseVariables: ["2018", "2019", "2020", "2021", "2022"],
  builtInMemoryVariables: [8, 16, 32, 64, 128, 256, 512],
  ramSizeVariables: [1, 2, 3, 4, 6, 8, 12, 16],
  items: [],
  pages: 1,
  params: {
    page: 1,
    perPage: 10,
    sortBy: "price",
    sortDirection: "asc",
    search: undefined,
    fromPrice: undefined,
    toPrice: undefined,
    manufacturers: [],
    releases: [],
    builtInMemory: [],
    ramSize: [],
    haveNfc: "",
  },

  clearFilters() {
    products.params = {
      page: 1,
      perPage: 10,
      sortBy: "price",
      sortDirection: "asc",
      search: undefined,
      fromPrice: undefined,
      toPrice: undefined,
      manufacturers: [],
      releases: [],
      builtInMemory: [],
      ramSize: [],
      haveNfc: "",
    };
  },

  async createProduct(payload) {
    try {
      const formData = new FormData();

      const keys = Object.keys(payload);

      keys?.forEach((key) => {
        formData.append(key, payload[key]);
      });

      await post(endpoints.products.createProduct, formData, {
        "Content-Type": "multipart/form-data",
        Accept: true,
      });

      return true;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async fetchProductsByAdmin(params = {}) {
    try {
      const { data } = await get(
        endpoints.products.fetchProductsByAdmin,
        params
      );

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async fetchProduct(productId) {
    try {
      const { data } = await get(
        endpoints.products.fetchProduct.replace("{productId}", productId)
      );

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async replaceImage(productId, file) {
    try {
      const formData = new FormData();

      formData.append("image", file);

      const { data } = await post(
        endpoints.products.replaceImageByAdmin.replace(
          "{productId}",
          productId
        ),
        formData,
        {
          "Content-Type": "multipart/form-data",
          Accept: true,
        }
      );

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async changeProduct(productId, payload) {
    try {
      const { data } = await patch(
        endpoints.products.changeProductByAdmin.replace(
          "{productId}",
          productId
        ),
        payload
      );

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async fetchProducts(params = {}) {
    try {
      products.loading = true;

      const { data } = await get(endpoints.products.fetchProducts, params);

      if (data && data?.data) {
        products.items = data?.data;
        products.pages = data?.pages;
      }

      products.loading = false;

      return data;
    } catch (err) {
      showError(err);

      products.loading = false;
      return false;
    }
  },
});

export default products;
