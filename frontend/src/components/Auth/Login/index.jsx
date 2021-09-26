import React from "react";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();

  console.log(location?.state);

  console.log(1);

  return <div>glkdfsnkdsfmnmdsaf,dsafm,ndsafm,nsadfm,ndsam,nfsa,mfsa.</div>;
};

export default Login;
