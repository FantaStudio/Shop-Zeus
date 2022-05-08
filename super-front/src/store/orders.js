import { store } from "@risingstack/react-easy-state";
import { endpoints } from "../endpoints";
import { get, patch, post, showError } from "./../api/index";

const orders = store({
  async fetchOrders() {
    try {
      const { data } = await get(endpoints.orders.fetchOrders);

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async fetchOrdersByAdmin(params = {}) {
    try {
      const { data } = await get(endpoints.orders.fetchOrderByAdmin, params);

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async fetchOrderByAdminCsv(params = {}) {
    try {
      const { data } = await get(
        endpoints.orders.fetchOrderByAdminCsv,
        params,
        "blob",
        { Accept: "text/csv; charset=utf-8" }
      );

      const blob = data;

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "all_orders.csv";

      link.click();
    } catch (err) {
      console.log(err);
      showError(err);
      return false;
    }
  },

  async createOrder(payload) {
    try {
      const { data } = await post(endpoints.orders.createOrder, payload);

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async completeOrder(orderId) {
    try {
      await patch(endpoints.orders.completeOrder.replace("{orderId}", orderId));

      return true;
    } catch (err) {
      showError(err);
      return false;
    }
  },
});

export default orders;
