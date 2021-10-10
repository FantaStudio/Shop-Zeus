import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useState } from "react";

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

const ProductInformation = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({});

  const fetchDetail = useCallback(() => {
    setLoading(true);

    setDetail({
      model: "Iphone",
      manufacturer: "Apple",
      price: "89000",
      file: null,
      guaranteeInMonths: 6,
      releases: "2021",
      color: "Черный",
      supportESim: true,
      support3G: true,
      supportLte: true,
      support5G: true,
      formatSim: "nano",
      countSimCards: 2,
      displayInInch: 6,
      screenResolution: "1000x600",
      aspectRadio: "17:9",
      countColorIsDisplay: 500,
      updateFrequency: 60,
      materialType: "Plastic",
      osVersion: "IOS",
      supportGoogleMobileService: true,
      manufacturerCPU: "Intel",
      modelCPU: "core i9",
      countCores: 12,
      frequencyCPU: 90,
      ramSize: 20,
      builtInMemory: 120,
      backCameraMp: 40,
      frontCameraMp: 20,
      versionBluetooth: 5,
      standardWiFi: 6,
      NFC: true,
      cableInterface: "micro usb",
      batteryCapacity: 4000,
      supportQuickCharger: true,
      supportWirelessCharger: true,
      width: 600,
      height: 300,
      thickness: 10,
      weight: 10,
    });

    setLoading(false);
  }, []);

  return (
    <div className={classes.root}>
      <h1>Редактирование продукта ({detail?.model})</h1>
      <div className={classes.block}>{loading && <LinearProgress />}</div>
    </div>
  );
};

export default ProductInformation;
