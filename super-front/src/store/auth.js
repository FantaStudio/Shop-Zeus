import { store } from "@risingstack/react-easy-state";
import { get, post, showError } from "../api";
import { endpoints } from "../endpoints";

const auth = store({
  loading: false,
  profile: undefined,
  productsInBasket: [],

  async login(email, password) {
    try {
      const { data } = await post(endpoints.auth.login, { email, password });

      localStorage.setItem("zeusShopToken", data?.token);

      auth.profile = {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        roles: data?.roles || [],
      };

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async fetchProfile() {
    try {
      auth.loading = true;

      const { data } = await get(endpoints.auth.fetchProfile);

      auth.profile = {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        roles: data?.roles || [],
      };

      auth.loading = false;

      return data;
    } catch (err) {
      showError(err);
      auth.loading = false;
      return false;
    }
  },
});

export default auth;
