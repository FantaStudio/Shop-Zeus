import { store } from "@risingstack/react-easy-state";

const auth = store({
  loading: false,
  profile: undefined,
});

export default auth;
