import { green, grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import numbro from "numbro";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useUploadFile } from "../../../../../hooks/useUploadFile";
import products from "../../../../../store/products";
import Form from "../components/Form";
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

const CreateProduct = () => {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const { file, upload } = useUploadFile();

  const form = useForm({
    defaultValues: {
      model: "A80",
      manufacturer: "Samsung",
      price: "15,000",
      file: null,
      guaranteeInMonths: 6,
      release: "2020",
      color: "48",
      supportESim: true,
      support3G: true,
      supportLte: true,
      support5G: false,
      formatSim: "nano",
      countSimCards: "2",
      displayInInch: "6.4", // дюймовка, в начале показывать "
      screenResolution: "2400:1080", // показывать пример как вводить данные 800x600
      aspectRadio: "16:9", // соотношение сторон, показывать пример ввода 17:9
      countColorIsDisplay: "16700000", // показывать в конце текстового поля  "тыс."
      updateFrequency: "60", // в конце приписывать Гц(или как там, глянуть в деталях товара)
      materialType: "Plastic",
      osVersion: "Android 9.0 Pie",
      supportGoogleMobileService: false,
      manufacturerCPU: "MediaTek",
      modelCPU: "Helio P70 MT6771V",
      countCores: "8",
      frequencyCPU: "2.4", // Частота процессора, тоже в конце показывать Ггц(или как там, в детали глянуть)
      ramSize: "8", // оперативная память, в конце показывать Гб
      builtInMemory: "128", // встроенная память, в конце показывать Гб
      backCameraMp: "48", // основная задняя камера, показывать в конце Мп.
      frontCameraMp: "8", // тыловая сторона камера, показывать  в конце Мп.
      versionBluetooth: "4.2",
      standardWiFi: "5 (802.11ac) , 4 (802.11n)",
      NFC: false,
      cableInterface: "USB Type-C",
      batteryCapacity: "4025", // емкость батареи ,показывать в конце m*ч (или как там, глянуть в деталях товара)
      supportQuickCharger: false,
      supportWirelessCharger: false,
      width: "73.3", // показывать в конце мм.
      height: "160.2", // показывать в конце мм.
      thickness: "7.9", // показывать в конце мм.
      weight: "174", // показывать в конце мм.
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const confirm = useCallback(
    async (values) => {
      setLoading(true);

      values.price = numbro.unformat(values.price);

      const result = await products.createProduct({ ...values, file });

      if (result) {
        history.goBack();
      }

      setLoading(false);
    },
    [file, history]
  );

  return (
    <div className={classes.root}>
      <h1>Создание продукта (телефона)</h1>

      <div className={classes.block}>
        <Form form={form} file={file} upload={upload} />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ZeusButton
            style={
              !file || loading
                ? { backgroundColor: grey[200] }
                : { backgroundColor: green[600] }
            }
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
