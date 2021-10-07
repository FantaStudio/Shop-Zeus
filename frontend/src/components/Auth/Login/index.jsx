import { FormHelperText, IconButton } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { secondaryThemeColor } from "../../../helpers/colors";
import MyTextField from "./../../System/FormComponents/MyTextField";
import ZeusButton from "./../../System/ZeusButton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  block: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: "1rem",
    maxWidth: 400,
    width: "100%",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  link: {
    color: secondaryThemeColor,
    marginTop: ".6rem",
  },
  blockInputs: {
    width: "100%",
    marginBottom: "1rem",
  },
  error: {
    color: red[600],
  },
});

const Login = () => {
  const location = useLocation();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const confirm = useCallback((values) => {
    console.log(values);
  }, []);

  return (
    <div className={classes.root}>
      <h1>Авторизация</h1>
      <div className={classes.block}>
        {location?.state?.from && (
          <p
            style={{
              color: secondaryThemeColor,
              fontSize: ".85rem",
              textAlign: "center",
              fontWeight: 500,
              marginBottom: "1.5rem",
            }}
          >
            Чтобы пройти дальше вам, необходимо авторизоваться
          </p>
        )}

        <div
          className={classes.blockInputs}
          style={location.state?.from ? {} : { marginTop: 14 }}
        >
          <MyTextField
            control={form.control}
            name="email"
            label="Почта"
            rules={{ required: true }}
            fullWidth
          />

          {form.formState.errors?.email?.type === "required" && (
            <FormHelperText className={classes.error}>
              Поле обязательное
            </FormHelperText>
          )}

          <div style={{ height: 15 }} />

          <MyTextField
            control={form.control}
            name="password"
            type={showPassword ? "text" : "password"}
            label="Пароль"
            endAdornment={
              <>
                {showPassword ? (
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => setShowPassword(false)}
                  >
                    <VisibilityOff />
                  </IconButton>
                ) : (
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => setShowPassword(true)}
                  >
                    <Visibility />
                  </IconButton>
                )}
              </>
            }
            rules={{ required: true }}
            fullWidth
          />

          {form.formState.errors?.password?.type === "required" && (
            <FormHelperText className={classes.error}>
              Поле обязательное
            </FormHelperText>
          )}
        </div>

        <div className={classes.actions}>
          <ZeusButton onClick={form.handleSubmit(confirm)}>Войти</ZeusButton>
          <Link className={classes.link}>Нет аккаунта? Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
