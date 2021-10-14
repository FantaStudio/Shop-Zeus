import { store } from "@risingstack/react-easy-state";
import { endpoints } from "../endpoints";
import { get, showError } from "./../api/index";

const admin = store({
  loading: false,

  async fetchClients(params = {}) {
    try {
      const { data } = await get(endpoints.admin.fetchClients, params);

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },
});

export default admin;
