import { FormHelperText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useForm } from "react-hook-form";
import MyAmount from "./../../../../System/FormComponents/MyAmount";
import MyCheckboxLabel from "./../../../../System/FormComponents/MyCheckboxLabel";
import MySimpleMenu from "./../../../../System/FormComponents/MySimpleMenu";
import MyTextField from "./../../../../System/FormComponents/MyTextField";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2rem",
    width: "100%",
    height: "100%",
  },
  block: {
    minWidth: 500,
    padding: "15px 20px",
    backgroundColor: "#fff",
    borderRadius: "1rem",
    whiteSpace: "nowrap",
    height: "min-content",
  },
});

/* 
виды сим-карт 
  

*/

/* 
виды корпусов 
  const options = [
    {
      label: "Пластиковый",
      value: "Plastic"
    },
    {
      label: "Металлический",
      value: "Metal"
    },
  ]

*/

const guaranteeOptions = [
  {
    label: "3 месяца",
    value: 6,
  },
  {
    label: "6 месяцев",
    value: 6,
  },
  {
    label: "12 месяцев",
    value: 12,
  },
  {
    label: "24 месяца",
    value: 24,
  },
];

const formatSimOptions = [
  {
    label: "Nano-SIM карта",
    value: "nano",
  },
  {
    label: "Micro-SIM карта",
    value: "micro",
  },
  {
    label: "Mini-SIM карта",
    value: "mini",
  },
  {
    label: "Полноразмерная SIM карта",
    value: "fullSize",
  },
];

const validByNumbers = new RegExp(/^[0-9]+([.][0-9]+)?$/);

const CreateProduct = () => {
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      model: "",
      manufacturer: "",
      price: "",
      file: null,
      guaranteeInMonths: 6,
      releases: "",
      color: "",
      supportESim: false,
      support3G: true,
      supportLte: false,
      support5G: false,
      formatSim: "none",
      countSimCards: "",
      displayInInch: "", // дюймовка, в начале показывать "
      screenResolution: "", // показывать пример как вводить данные 800x600
      aspectRadio: "", // соотношение сторон, показывать пример ввода 17:9
      countColorIsDisplay: "", // показывать в конце текстового поля  "тыс."
      updateFrequency: "", // в конце приписывать Гц(или как там, глянуть в деталях товара)
      materialType: "Plastic",
      osVersion: "",
      supportGoogleMobileService: false,
      manufacturerCPU: "",
      modelCPU: "",
      countCores: "",
      frequencyCPU: "", // Частота процессора, тоже в конце показывать Ггц(или как там, в детали глянуть)
      ramSize: "", // оперативная память, в конце показывать Гб
      builtInMemory: "", // встроенная память, в конце показывать Гб
      backCameraMp: "", // основная задняя камера, показывать в конце Мп.
      frontCameraMp: "", // тыловая сторона камера, показывать  в конце Мп.
      versionBluetooth: "",
      standardWiFi: "",
      NFC: false,
      cableInterface: "",
      batteryCapacity: "", // емкость батареи ,показывать в конце m*ч (или как там, глянуть в деталях товара)
      supportQuickCharger: false,
      supportWirelessCharger: false,
      width: "", // показывать в конце мм.
      height: "", // показывать в конце мм.
      thickness: "", // показывать в конце мм.
      weight: "", // показывать в конце мм.
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  return (
    <div className={classes.root}>
      <h1>Создание продукта (телефона)</h1>

      <div className={classes.block}>
        <MyTextField
          control={form?.control}
          name="model"
          label="Модель"
          autoComplete="off"
          rules={{ required: true }}
          fullWidth
        />

        {form?.formState?.errors?.model?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="manufacturer"
          label="Производитель"
          autoComplete="off"
          rules={{ required: true }}
          fullWidth
        />

        {form?.formState?.errors?.manufacturer?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyAmount
          control={form?.control}
          name="price"
          label="Цена"
          rules={{ required: true }}
        />

        {form?.formState?.errors?.price?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MySimpleMenu
          control={form?.control}
          name="guaranteeInMonths"
          label="Гарантия"
          options={guaranteeOptions}
          rules={{ required: true }}
          fullWidth
        />

        {form?.formState?.errors?.guaranteeInMonths?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="releases"
          label="Год релиза"
          autoComplete="off"
          rules={{
            required: true,
            validate: {
              valid: (value) => {
                if (value && validByNumbers.test(value)) {
                  return true;
                }

                return false;
              },
            },
          }}
          fullWidth
        />

        {form?.formState?.errors?.releases?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.releases?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="color"
          label="Цвет"
          autoComplete="off"
          rules={{ required: true }}
          fullWidth
        />

        {form?.formState?.errors?.color?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyCheckboxLabel
          control={form?.control}
          label="Поддержка eSIM"
          name="supportESim"
        />

        <div style={{ height: 10 }} />

        <MyCheckboxLabel
          control={form?.control}
          label="Поддержка 3G"
          name="support3G"
        />

        <div style={{ height: 10 }} />

        <MyCheckboxLabel
          control={form?.control}
          label="Поддержка 4G (LTE)"
          name="supportLte"
        />

        <div style={{ height: 10 }} />

        <MyCheckboxLabel
          control={form?.control}
          label="Поддержка 5G"
          name="support5G"
        />

        <div style={{ height: 10 }} />

        <MySimpleMenu
          control={form?.control}
          name="formatSim"
          label="Формат сим карты"
          options={formatSimOptions}
          rules={{ required: true }}
          fullWidth
        />

        {form?.formState?.errors?.formatSim?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="releases"
          label="Год релиза"
          autoComplete="off"
          rules={{
            required: true,
            validate: {
              valid: (value) => {
                if (value && validByNumbers.test(value)) {
                  return true;
                }

                return false;
              },
            },
          }}
          fullWidth
        />

        {form?.formState?.errors?.releases?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.releases?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />
      </div>
    </div>
  );
};

export default CreateProduct;
