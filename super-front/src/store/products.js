import { store } from "@risingstack/react-easy-state";
import { endpoints } from "../endpoints";
import { get, patch, post, showError } from "./../api/index";

const products = store({
  loading: false,
  manufacturesVariables: [
    "Apple",
    "BQ",
    "DEXP",
    "Samsung",
    "Xiaomi",
    "Huawei",
    "HONOR",
    "OPPO",
  ],
  releaseVariables: ["2018", "2019", "2020", "2021"],
  builtInMemoryVariables: [
    "8 Гб",
    "16 Гб",
    "32 Гб",
    "64 Гб",
    "128 Гб",
    "256 Гб",
    "512 Гб",
  ],
  ramSizeVariables: [
    "1 Гб",
    "2 Гб",
    "3 Гб",
    "4 Гб",
    "6 Гб",
    "8 Гб",
    "12 Гб",
    "16 Гб",
  ],
  items: [
    {
      id: 1,
      name: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      price: 2000,
      imageHref: "/images/phone.jpg",
      guaranteeInMonths: 12,
      release: 2020,
      color: "Черный",
      supportESim: false,
      support3G: true,
      supportLte: true,
      support5G: false,
      formatSim: "nano",
      countSimCards: 2,
      displayInInch: 4,
      screenResolution: "800 x 480",
      aspectRadio: "17:9",
      countColorIsDisplay: 250,
      updateFrequency: 60,
      materialType: "Plastic",
      osVersion: "Android 11 Go",
      supportGoogleMobileService: true,
      manufacturerCPU: "Intel",
      modelCPU: "Core i9",
      countCores: 4,
      frequencyCPU: 1.3,
      ramSize: 1,
      builtInMemory: 8,
      backCameraMp: 8,
      frontCameraMp: 1,
      versionBluetooth: 4.2,
      standardWiFi: 4,
      NFC: false,
      cableInterface: "micro usb",
      batteryCapacity: 1440,
      supportQuickCharger: false,
      supportWirelessCharger: false,
      width: 62.88,
      height: 125.2,
      thickness: 9.8,
      weight: 110.3,
    },
    {
      id: 2,
      name: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      price: 3000,
      imageHref: "/images/phone.jpg",
      guaranteeInMonths: 6,
      release: 2020,
      color: "черный",
      supportESim: false,
      support3G: true,
      supportLte: true,
      support5G: false,
      formatSim: "nano",
      countSimCards: 2,
      displayInInch: 4,
      screenResolution: "800 x 480",
      aspectRadio: "17:9",
      countColorIsDisplay: "250тыс",
      updateFrequency: 60,
      materialType: "Plastic",
      osVersion: "Android 11 Go",
      supportGoogleMobileService: true,
      manufacturerCPU: "Intel",
      modelCPU: "Core i9",
      countCores: 4,
      frequencyCPU: 1.3,
      ramSize: 1,
      builtInMemory: 8,
      backCameraMp: 8,
      frontCameraMp: 1,
      versionBluetooth: 4.2,
      standardWiFi: 4,
      NFC: false,
      cableInterface: "micro usb",
      batteryCapacity: 1440,
      supportQuickCharger: false,
      supportWirelessCharger: false,
      width: 62.88,
      height: 125.2,
      thickness: 9.8,
      weight: 110.3,
    },
    {
      id: 3,
      name: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      price: 4000,
      imageHref: "/images/phone.jpg",
      guaranteeInMonths: 24,
      release: 2020,
      color: "черный",
      supportESim: false,
      support3G: true,
      supportLte: true,
      support5G: false,
      formatSim: "nano",
      countSimCards: 2,
      displayInInch: 4,
      screenResolution: "800 x 480",
      aspectRadio: "17:9",
      countColorIsDisplay: "250тыс",
      updateFrequency: 60,
      materialType: "Plastic",
      osVersion: "Android 11 Go",
      supportGoogleMobileService: true,
      manufacturerCPU: "Intel",
      modelCPU: "Core i9",
      countCores: 4,
      frequencyCPU: 1.3,
      ramSize: 1,
      builtInMemory: 8,
      backCameraMp: 8,
      frontCameraMp: 1,
      versionBluetooth: 4.2,
      standardWiFi: 4,
      NFC: false,
      cableInterface: "micro usb",
      batteryCapacity: 1440,
      supportQuickCharger: false,
      supportWirelessCharger: false,
      width: 62.88,
      height: 125.2,
      thickness: 9.8,
      weight: 110.3,
    },
    {
      id: 4,
      name: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      price: 10000,
      imageHref: "/images/phone.jpg",
      guaranteeInMonths: 12,
      release: 2020,
      color: "черный",
      supportESim: true,
      support3G: true,
      supportLte: true,
      support5G: false,
      formatSim: "nano",
      countSimCards: 2,
      displayInInch: 4,
      screenResolution: "800 x 480",
      aspectRadio: "17:9",
      countColorIsDisplay: "250тыс",
      updateFrequency: 60,
      materialType: "Plastic",
      osVersion: "Android 11 Go",
      supportGoogleMobileService: true,
      manufacturerCPU: "Intel",
      modelCPU: "Core i9",
      countCores: 4,
      frequencyCPU: 1.3,
      ramSize: 1,
      builtInMemory: 8,
      backCameraMp: 8,
      frontCameraMp: 1,
      versionBluetooth: 4.2,
      standardWiFi: 4,
      NFC: false,
      cableInterface: "micro usb",
      batteryCapacity: 1440,
      supportQuickCharger: false,
      supportWirelessCharger: false,
      width: 62.88,
      height: 125.2,
      thickness: 9.8,
      weight: 110.3,
    },
    {
      id: 5,
      name: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      price: 12000,
      imageHref: "/images/phone.jpg",
      guaranteeInMonths: 12,
      release: 2020,
      color: "черный",
      supportESim: false,
      support3G: true,
      supportLte: true,
      support5G: false,
      formatSim: "nano",
      countSimCards: 2,
      displayInInch: 4,
      screenResolution: "800 x 480",
      aspectRadio: "17:9",
      countColorIsDisplay: "250тыс",
      updateFrequency: 60,
      materialType: "Plastic",
      osVersion: "Android 11 Go",
      supportGoogleMobileService: true,
      manufacturerCPU: "Intel",
      modelCPU: "Core i9",
      countCores: 4,
      frequencyCPU: 1.3,
      ramSize: 1,
      builtInMemory: 8,
      backCameraMp: 8,
      frontCameraMp: 1,
      versionBluetooth: 4.2,
      standardWiFi: 4,
      NFC: false,
      cableInterface: "micro usb",
      batteryCapacity: 1440,
      supportQuickCharger: false,
      supportWirelessCharger: false,
      width: 62.88,
      height: 125.2,
      thickness: 9.8,
      weight: 110.3,
    },
  ],
  pages: 1,
  params: {
    page: 1,
    perPage: 30,
    sortBy: "price",
    sortDirection: "asc",
    search: undefined,
    haveInMarket: "inStock",
    fromPrice: undefined,
    toPrice: undefined,
    manufacturers: [],
    releases: [],
    builtInMemory: [],
    ramSize: [],
    haveNfc: "",
  },

  async createProduct(payload) {
    try {
      const formData = new FormData();

      const keys = Object.keys(payload);

      keys?.forEach((key) => {
        formData.append(key, payload[key]);
      });

      await post(endpoints.products.createProduct, formData, {
        "Content-Type": "multipart/form-data",
        Accept: true,
      });

      return true;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async fetchProductsByAdmin(params = {}) {
    try {
      const { data } = await get(
        endpoints.products.fetchProductsByAdmin,
        params
      );

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async fetchProductByAdmin(productId) {
    try {
      const { data } = await get(
        endpoints.products.fetchProductByAdmin.replace("{productId}", productId)
      );

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async replaceImage(productId, file) {
    try {
      const formData = new FormData();

      formData.append("image", file);

      const { data } = await post(
        endpoints.products.replaceImageByAdmin.replace(
          "{productId}",
          productId
        ),
        formData,
        {
          "Content-Type": "multipart/form-data",
          Accept: true,
        }
      );

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async changeProduct(productId, payload) {
    try {
      const { data } = await patch(
        endpoints.products.changeProductByAdmin.replace(
          "{productId}",
          productId
        ),
        payload
      );

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },
});

export default products;
