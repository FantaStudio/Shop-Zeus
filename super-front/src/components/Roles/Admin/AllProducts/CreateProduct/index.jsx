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
