import { DialogActions, FormHelperText, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { parse } from "query-string";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { secondaryThemeColor } from "../../../helpers/colors";
import { redirects } from "../../../helpers/redirects";
import auth from "../../../store/auth";
import Alert from "./../../System/Alert";
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
});

const DialogConfirmationEmail = () => {
  const location = useLocation();
  const ref = useRef(false);

  const [open, setOpen] = useState(false);

  const params = parse(location.search);

  useEffect(() => {
    if (!ref.current && params?.confirmEmail) {
      ref.current = true;

      setOpen(true);
    }
  }, [params?.confirmEmail]);

  return (
    <Alert
      open={open}
      setOpen={setOpen}
      customTitle="Поздравляем!"
      content={
        <>
          <p>
            Ваша почта успешно подтверждена и вы можете авторизоваться. Удачных
            покупок!
          </p>

          <DialogActions>
            <ZeusButton onClick={() => setOpen(false)}>Хорошо!</ZeusButton>
          </DialogActions>
        </>
      }
      size="xs"
    />
  );
};

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const confirm = useCallback(
    async (values) => {
      setLoading(true);

      const result = await auth.login(values?.email, values?.password);

      if (result) {
        console.log(result);
        redirects(result?.roles, history, location);
      }

      setLoading(false);
    },
    [history, location]
  );

  return (
    <div className={classes.root}>
      <DialogConfirmationEmail />

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
            <FormHelperText error>Поле обязательное</FormHelperText>
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
            <FormHelperText error>Поле обязательное</FormHelperText>
          )}
        </div>

        <div className={classes.actions}>
          <ZeusButton onClick={form.handleSubmit(confirm)} loading={loading}>
            Войти
          </ZeusButton>
          <Link to="/registration" className={classes.link}>
            Нет аккаунта? Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
