import { makeStyles } from "@material-ui/core/styles";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import auth from "./../../../../../store/auth";
import Field from "./../../../../ProductDetail/components/Field";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
    width: "100%",
    height: "100%",
  },
  block: {
    minWidth: 400,
    padding: "15px 20px",
    backgroundColor: "#fff",
    borderRadius: "1rem",
    whiteSpace: "nowrap",
    height: "min-content",
  },
});

const Information = view(() => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.block}>
        <Field left="Имя" right={auth?.profile?.name} />

        <Field left="Почта" right={auth?.profile?.email} />

        <Field left="Телефон" right={auth?.profile?.phone} />
      </div>
    </div>
  );
});

export default Information;
