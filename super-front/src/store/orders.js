import { store } from "@risingstack/react-easy-state";
import { endpoints } from "../endpoints";
import { get, post, showError } from "./../api/index";

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

  async createOrder(payload) {
    try {
      const { data } = await post(endpoints.orders.createOrder, payload);

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },
});

export default orders;
