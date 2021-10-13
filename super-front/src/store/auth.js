import { store } from "@risingstack/react-easy-state";
import { post, showError } from "../api";
import { endpoints } from "../endpoints";

const auth = store({
  loading: false,
  profile: undefined,
  productsInBasket: [],

  async login(email, password) {
    try {
      const { data } = await post(endpoints.auth.login, { email, password });

      localStorage.setItem("zeusShopToken", data?.token);

      auth.productsInBasket = {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        roles: data?.roles || [],
      };

      return true;
    } catch (err) {
      showError(err);
      return false;
    }
  },
});

export default auth;
