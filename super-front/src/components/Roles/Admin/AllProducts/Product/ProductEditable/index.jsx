import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import products from "../../../../../../store/products";
import ZeusButton from "../../../../../System/ZeusButton";
import Form from "../../components/Form";

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

const ProductEditable = () => {
  const classes = useStyles();
  const history = useHistory();

  const match = useRouteMatch();

  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      model: "",
      manufacturer: "",
      price: "",
      guaranteeInMonths: 6,
      release: "",
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

  const { setValue } = form;
  const { detail } = location.state || {};

  const initialForm = useCallback(() => {
    if (!detail?.model) {
      return;
    }

    setTimeout(() => setValue("model", detail?.model), 0);

    setTimeout(() => setValue("manufacturer", detail?.manufacturer), 0);

    setTimeout(() => setValue("price", detail?.price), 0);

    setTimeout(
      () => setValue("guaranteeInMonths", detail?.guaranteeInMonths),
      0
    );

    setTimeout(() => setValue("release", detail?.release), 0);

    setTimeout(() => setValue("color", detail?.color), 0);

    setTimeout(() => setValue("supportESim", detail?.supportESim), 0);

    setTimeout(() => setValue("support3G", detail?.support3G), 0);

    setTimeout(() => setValue("supportLte", detail?.supportLte), 0);

    setTimeout(() => setValue("support5G", detail?.support5G), 0);

    setTimeout(() => setValue("formatSim", detail?.formatSim), 0);

    setTimeout(() => setValue("countSimCards", detail?.countSimCards), 0);

    setTimeout(() => setValue("displayInInch", detail?.displayInInch), 0);

    setTimeout(() => setValue("screenResolution", detail?.screenResolution), 0);

    setTimeout(() => setValue("aspectRadio", detail?.aspectRadio), 0);

    setTimeout(
      () => setValue("countColorIsDisplay", detail?.countColorIsDisplay),
      0
    );

    setTimeout(() => setValue("updateFrequency", detail?.updateFrequency), 0);

    setTimeout(() => setValue("materialType", detail?.materialType), 0);

    setTimeout(() => setValue("osVersion", detail?.osVersion), 0);

    setTimeout(
      () =>
        setValue(
          "supportGoogleMobileService",
          detail?.supportGoogleMobileService
        ),
      0
    );

    setTimeout(() => setValue("manufacturerCPU", detail?.manufacturerCPU), 0);

    setTimeout(() => setValue("modelCPU", detail?.modelCPU), 0);

    setTimeout(() => setValue("countCores", detail?.countCores), 0);

    setTimeout(() => setValue("frequencyCPU", detail?.frequencyCPU), 0);

    setTimeout(() => setValue("ramSize", detail?.ramSize), 0);

    setTimeout(() => setValue("builtInMemory", detail?.builtInMemory), 0);

    setTimeout(() => setValue("backCameraMp", detail?.backCameraMp), 0);

    setTimeout(() => setValue("frontCameraMp", detail?.frontCameraMp), 0);

    setTimeout(() => setValue("versionBluetooth", detail?.versionBluetooth), 0);

    setTimeout(() => setValue("standardWiFi", detail?.standardWiFi), 0);

    setTimeout(() => setValue("NFC", detail?.NFC), 0);

    setTimeout(() => setValue("cableInterface", detail?.cableInterface), 0);

    setTimeout(() => setValue("batteryCapacity", detail?.batteryCapacity), 0);

    setTimeout(
      () => setValue("supportQuickCharger", detail?.supportQuickCharger),
      0
    );

    setTimeout(
      () => setValue("supportWirelessCharger", detail?.supportWirelessCharger),
      0
    );

    setTimeout(() => setValue("width", detail?.width), 0);

    setTimeout(() => setValue("height", detail?.height), 0);

    setTimeout(() => setValue("thickness", detail?.thickness), 0);

    setTimeout(() => setValue("weight", detail?.weight), 0);
  }, [detail, setValue]);

  useEffect(() => {
    initialForm();
  }, [initialForm]);

  const confirm = useCallback(
    async (values) => {
      setLoading(true);

      const payload = {};

      const keys = Object?.keys(values);

      keys.forEach((key) => {
        if (values?.[key] !== undefined && values?.[key] !== detail?.[key]) {
          payload[key] = values[key];
        }
      });

      const result = await products.changeProduct(match.params?.id, payload);

      if (result) {
        history.goBack();
      }

      setLoading(false);
    },
    [detail, history, match.params?.id]
  );

  return (
    <div className={classes.root}>
      <h1>Редактирование продукта ({detail?.model})</h1>

      <div className={classes.block}>
        <Form form={form} />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ZeusButton
            onClick={history.goBack}
            loading={loading}
            disabled={loading}
          >
            Отмена
          </ZeusButton>

          <ZeusButton
            style={{ backgroundColor: green[600], marginLeft: "1rem" }}
            onClick={form.handleSubmit(confirm)}
            loading={loading}
            disabled={loading}
          >
            Сохранить
          </ZeusButton>
        </div>
      </div>
    </div>
  );
};

export default ProductEditable;
