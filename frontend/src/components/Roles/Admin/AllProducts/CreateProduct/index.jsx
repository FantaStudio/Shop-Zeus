import { FormHelperText } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useUploadFile } from "../../../../../hooks/useUploadFile";
import products from "../../../../../store/products";
import UploadArea from "../../../../System/UploadArea";
import { secondaryThemeColor } from "./../../../../../helpers/colors";
import MyAmount from "./../../../../System/FormComponents/MyAmount";
import MyCheckboxLabel from "./../../../../System/FormComponents/MyCheckboxLabel";
import MySimpleMenu from "./../../../../System/FormComponents/MySimpleMenu";
import MyTextField from "./../../../../System/FormComponents/MyTextField";
import ZeusButton from "./../../../../System/ZeusButton";

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

const materialTypeOptions = [
  {
    label: "Пластиковый",
    value: "Plastic",
  },
  {
    label: "Металлический",
    value: "Metal",
  },
];

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
  const [loading, setLoading] = useState(false);

  const { file, upload } = useUploadFile();

  const optionsManufacturer = products.manufacturesVariables.map((item) => {
    return { label: item, value: item };
  });

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
      formatSim: "nano",
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

  const confirm = useCallback((values) => {
    setLoading(true);

    console.log(values);

    setLoading(false);
  }, []);

  return (
    <div className={classes.root}>
      <h1>Создание продукта (телефона)</h1>

      <div className={classes.block}>
        <h2 style={{ color: secondaryThemeColor }}>Загрузите изображение</h2>

        <UploadArea file={file} upload={upload} />

        <div style={{ height: 15 }} />

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

        <MySimpleMenu
          control={form?.control}
          name="manufacturer"
          label="Производитель"
          options={optionsManufacturer}
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
          name="countSimCards"
          label="Количество SIM-карт"
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

        {form?.formState?.errors?.countSimCards?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.countSimCards?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="displayInInch"
          startAdornment={`"`}
          label="Дисплей (в дюймах)"
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

        {form?.formState?.errors?.displayInInch?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.displayInInch?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="screenResolution"
          label="Расширение экрана"
          placeholder="Например, 800x600"
          autoComplete="off"
          rules={{ required: true }}
          fullWidth
        />

        {form?.formState?.errors?.screenResolution?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="aspectRadio"
          label="Соотношение сторон"
          placeholder="Например, 17:9"
          autoComplete="off"
          rules={{ required: true }}
          fullWidth
        />

        {form?.formState?.errors?.aspectRadio?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="countColorIsDisplay"
          endAdornment={`тыс.`}
          label="Количество цветов на экране"
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

        {form?.formState?.errors?.countColorIsDisplay?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.countColorIsDisplay?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="updateFrequency"
          endAdornment={`Гц`}
          label="Частота обновления экрана"
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

        {form?.formState?.errors?.updateFrequency?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.updateFrequency?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MySimpleMenu
          control={form?.control}
          name="materialType"
          label="Материал корпуса"
          options={materialTypeOptions}
          rules={{ required: true }}
          fullWidth
        />

        {form?.formState?.errors?.materialType?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="osVersion"
          label="Версия OS"
          autoComplete="off"
          rules={{ required: true }}
          fullWidth
        />

        {form?.formState?.errors?.osVersion?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyCheckboxLabel
          control={form?.control}
          label="Поддержка Google Mobile Services"
          name="supportGoogleMobileService"
        />

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="modelCPU"
          label="Модель процессора"
          autoComplete="off"
          rules={{ required: true }}
          fullWidth
        />

        {form?.formState?.errors?.modelCPU?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="manufacturerCPU"
          label="Производитель процессора"
          autoComplete="off"
          rules={{ required: true }}
          fullWidth
        />

        {form?.formState?.errors?.manufacturerCPU?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="countCores"
          label="Количество ядер"
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

        {form?.formState?.errors?.countCores?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.countCores?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="frequencyCPU"
          label="Частота работы процессора"
          endAdornment={"ГГц"}
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

        {form?.formState?.errors?.countCores?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.countCores?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="ramSize"
          label="Объем оперативной памяти"
          endAdornment={"Гб"}
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

        {form?.formState?.errors?.ramSize?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.ramSize?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="builtInMemory"
          label="Объем встроенной памяти"
          endAdornment={"Гб"}
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

        {form?.formState?.errors?.builtInMemory?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.builtInMemory?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="backCameraMp"
          label="Основная (тыловая) камера"
          endAdornment={"Мп"}
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

        {form?.formState?.errors?.backCameraMp?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.backCameraMp?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="frontCameraMp"
          label="Фронтальная камера"
          endAdornment={"Мп"}
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

        {form?.formState?.errors?.frontCameraMp?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.frontCameraMp?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="versionBluetooth"
          label="Версия Bluetooth"
          autoComplete="off"
          rules={{ required: true }}
          fullWidth
        />

        {form?.formState?.errors?.versionBluetooth?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="standardWiFi"
          label="Стандарт Wi-Fi"
          autoComplete="off"
          rules={{ required: true }}
          fullWidth
        />

        {form?.formState?.errors?.standardWiFi?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyCheckboxLabel control={form?.control} label="NFC" name="NFC" />

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="cableInterface"
          label="Проводной интерфейс"
          autoComplete="off"
          rules={{ required: true }}
          fullWidth
        />

        {form?.formState?.errors?.cableInterface?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="batteryCapacity"
          label="Емкость аккумулятора"
          endAdornment={"мА*ч"}
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

        {form?.formState?.errors?.batteryCapacity?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.batteryCapacity?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyCheckboxLabel
          control={form?.control}
          label="Поддержка быстрой зарядки"
          name="supportQuickCharger"
        />

        <div style={{ height: 10 }} />

        <MyCheckboxLabel
          control={form?.control}
          label="Поддержка беспроводной зарядки"
          name="supportWirelessCharger"
        />

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="width"
          endAdornment={`мм.`}
          label="Ширина"
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

        {form?.formState?.errors?.width?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.width?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="height"
          endAdornment={`мм.`}
          label="Высота"
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

        {form?.formState?.errors?.height?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.height?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="thickness"
          endAdornment={`мм.`}
          label="Толщина"
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

        {form?.formState?.errors?.thickness?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.thickness?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="weight"
          endAdornment={`г.`}
          label="Вес"
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

        {form?.formState?.errors?.weight?.type === "required" && (
          <FormHelperText error>Поле обязательное</FormHelperText>
        )}

        {form?.formState?.errors?.weight?.type === "valid" && (
          <FormHelperText error>
            Поле должно состоять только из цифр
          </FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ZeusButton
            style={{ backgroundColor: green[600] }}
            onClick={form.handleSubmit(confirm)}
            loading={loading}
            disabled={!file || loading}
          >
            Создать
          </ZeusButton>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
