import { store } from "@risingstack/react-easy-state";

/* 
{
    name: "Вася Пупкин",
    email: "vasya-pupkin@gmail.com",
    phone: "+79880622961",
    roles: ["Client"],
  }
*/

const auth = store({
  loading: false,
  profile: undefined,
  productsInBasket: [],
});

export default auth;
