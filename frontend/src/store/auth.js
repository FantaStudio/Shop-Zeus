import { store } from "@risingstack/react-easy-state";

const auth = store({
  loading: false,
  profile: {
    name: "Вася Пупкин",
    email: "vasya-pupkin@gmail.com",
    phone: "+79880622961",
    roles: ["Client"],
  },
  productsInBasket: [],
});

export default auth;
