import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Login = () => {
  /* const location = useLocation(); */
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>glkdfsnkdsfmnmdsaf,dsafm,ndsafm,nsadfm,ndsam,nfsa,mfsa</div>
    </div>
  );
};

export default Login;
