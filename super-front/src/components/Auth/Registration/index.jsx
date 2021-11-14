import { DialogActions, FormHelperText, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useCallback, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { secondaryThemeColor } from "../../../helpers/colors";
import auth from "../../../store/auth";
import Alert from "../../System/Alert";
import CustomCheckboxLabel from "../../System/CustomCheckboxLabel";
import MyTextField from "../../System/FormComponents/MyTextField";
import { is } from "./../../../helpers/is";
import ZeusButton from "./../../System/ZeusButton";
import WrapValidatePassword from "./../WrapValidatePassword";

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
    marginTop: "1rem",
  },
});

export const passwordRegexp = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
);

const Registration = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [accept, setAccept] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmationPassword: "",
      phone: "",
      name: "",
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const { setError } = form;

  const confirm = useCallback(async (values) => {
    setLoading(true);

    const payload = { ...values };

    if (payload.confirmationPassword) {
      delete payload.confirmationPassword;
    }

    const result = await auth.register(payload);

    if (result) {
      setOpenConfirm(true);
    }

    setLoading(false);
  }, []);

  const password = useWatch({
    control: form?.control,
    name: "password",
  });

  const confirmationPassword = useWatch({
    control: form?.control,
    name: "confirmationPassword",
  });

  useEffect(() => {
    if (confirmationPassword && confirmationPassword !== password) {
      setError("confirmationPassword", { type: "valid" });
    } else {
      setError("confirmationPassword", {});
    }
  }, [confirmationPassword, password, setError]);

  return (
    <>
      <div className={classes.root}>
        <h1>Регистрация</h1>

        <div className={classes.block}>
          <div className={classes.blockInputs}>
            <MyTextField
              control={form.control}
              name="name"
              label="Имя"
              rules={{ required: true, maxLength: 30 }}
              fullWidth
            />

            {form.formState.errors?.name?.type === "required" && (
              <FormHelperText error>Поле обязательное</FormHelperText>
            )}

            {form.formState.errors?.name?.type === "maxLength" && (
              <FormHelperText error>
                Поле должно быть не больше 30 символов
              </FormHelperText>
            )}

            <div style={{ height: 15 }} />

            <MyTextField
              control={form.control}
              name="email"
              label="Почта"
              rules={{
                required: true,
                validate: {
                  valid: (value) => {
                    if (!value) {
                      return true;
                    }

                    if (value && value?.includes("@")) {
                      return true;
                    }

                    return false;
                  },
                },
              }}
              fullWidth
            />

            {form.formState.errors?.email?.type === "required" && (
              <FormHelperText error>Поле обязательное</FormHelperText>
            )}

            {form.formState.errors?.email?.type === "valid" && (
              <FormHelperText error>Почта не валидна</FormHelperText>
            )}

            <div style={{ height: 15 }} />

            <div style={{ position: "relative" }}>
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
                rules={{
                  required: true,
                  validate: {
                    valid: (value) => {
                      if (!value) {
                        return true;
                      }

                      if (value && passwordRegexp.test(value)) {
                        return true;
                      }

                      return false;
                    },
                  },
                }}
                fullWidth
              />

              {form.formState.errors?.password?.type === "required" && (
                <FormHelperText error>Поле обязательное</FormHelperText>
              )}

              {form.formState.errors?.password?.type === "valid" && (
                <FormHelperText error>Пароль не валиден</FormHelperText>
              )}

              <WrapValidatePassword
                control={form?.control}
                name="password"
                errors={form?.formState?.errors}
              />
            </div>

            <div style={{ height: 15 }} />

            <MyTextField
              control={form.control}
              name="confirmationPassword"
              type={showConfirmationPassword ? "text" : "password"}
              label="Подтвердить пароль"
              endAdornment={
                <>
                  {showConfirmationPassword ? (
                    <IconButton
                      style={{ padding: 0 }}
                      onClick={() => setShowConfirmationPassword(false)}
                    >
                      <VisibilityOff />
                    </IconButton>
                  ) : (
                    <IconButton
                      style={{ padding: 0 }}
                      onClick={() => setShowConfirmationPassword(true)}
                    >
                      <Visibility />
                    </IconButton>
                  )}
                </>
              }
              rules={{
                required: true,
                validate: {
                  valid: (value) => {
                    if (!value) {
                      return true;
                    }

                    if (value && is(String, value) && value === password) {
                      return true;
                    }

                    return false;
                  },
                },
              }}
              fullWidth
            />

            {form.formState.errors?.confirmationPassword?.type ===
              "required" && (
              <FormHelperText error>Поле обязательное</FormHelperText>
            )}

            {form.formState.errors?.confirmationPassword?.type === "valid" && (
              <FormHelperText error>Пароли не совпадают</FormHelperText>
            )}

            <div style={{ height: 15 }} />

            <MyTextField
              control={form.control}
              name="phone"
              label="Телефон"
              rules={{ required: true }}
              placeholder="+79172347618"
              fullWidth
            />

            {form.formState.errors?.phone?.type === "required" && (
              <FormHelperText error>Поле обязательное</FormHelperText>
            )}

            <div style={{ height: 15 }} />

            <CustomCheckboxLabel
              checked={accept}
              label="Я даю согласию на обработку персональных данных"
              onChange={(e, checked) => {
                setAccept(checked);
              }}
            />
          </div>

          <div className={classes.actions}>
            <ZeusButton
              loading={loading}
              disabled={!accept}
              onClick={form.handleSubmit(confirm)}
            >
              Зарегистрироваться
            </ZeusButton>

            <Link to="/login" className={classes.link}>
              Уже есть аккаунт? Войти
            </Link>
          </div>
        </div>
      </div>

      <Alert
        open={openConfirm}
        setOpen={setOpenConfirm}
        customTitle="Регистрация прошла успешно"
        content={
          <>
            <p>
              Вам на e-mail было отправлено письмо для подтверждения
              регистрации.
            </p>

            <DialogActions>
              <ZeusButton
                onClick={() => {
                  setOpenConfirm(false);
                  form.reset({});
                }}
              >
                Хорошо
              </ZeusButton>
            </DialogActions>
          </>
        }
      />
    </>
  );
};

export default Registration;
