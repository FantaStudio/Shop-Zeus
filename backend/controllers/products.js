const Product = require("../models/Product");
var fs = require("fs");

const myCustomLabels = {
  totalDocs: "total",
  docs: "data",
  limit: "perPage",
  page: "page",
  totalPages: "pages",
};

class products {
  async fetchProductsByAdmin(req, res) {
    try {
      const { page, perPage, search } = req.query;

      let params = {};

      if (search) {
        params = {
          $text: {
            $search: search,
            $caseSensitive: false,
          },
        };
      }

      await Product.paginate(
        params,
        {
          page: page || 1,
          limit: perPage || 15,
          customLabels: myCustomLabels,
        },
        function (err, result) {
          return res.json(result);
        }
      );
    } catch (err) {
      return res.status(400).json({
        message: "Возникла ошибка",
        description: "При запросе всех продуктов сайта возникла проблема",
      });
    }
  }

  async fetchProductById(req, res) {
    try {
      const { productId } = req.params;

      if (!productId) {
        return res.status(400).json({
          message: "Возникла ошибка",
          description: "Product Id обязателен",
        });
      }

      const product = await Product.findById(productId).exec();

      if (!product) {
        return res.status(400).json({
          message: "Возникла ошибка",
          description: "Такой продукт не найден в базе данных",
        });
      }

      return res.status(200).json(product);
    } catch (err) {
      return res.status(400).json({
        message: "Возникла ошибка",
        description: "При запросе данного продукта возникла проблема",
      });
    }
  }

  async createProduct(req, res) {
    try {
      const file = req?.files?.[0] || [];

      if (!file) {
        return res.status(400).json({
          message: "Возникла ошибка",
          description:
            "Загружаемый файл должен быть следующих форматов: png, jpg, jpeg",
        });
      }

      const {
        model,
        manufacturer,
        price,
        guaranteeInMonths,
        release,
        color,
        supportESim,
        support3G,
        supportLte,
        support5G,
        formatSim,
        countSimCards,
        displayInInch,
        screenResolution,
        aspectRadio,
        countColorIsDisplay,
        updateFrequency,
        materialType,
        osVersion,
        supportGoogleMobileService,
        manufacturerCPU,
        modelCPU,
        countCores,
        frequencyCPU,
        ramSize,
        builtInMemory,
        backCameraMp,
        frontCameraMp,
        versionBluetooth,
        standardWiFi,
        NFC,
        cableInterface,
        batteryCapacity,
        supportQuickCharger,
        supportWirelessCharger,
        width,
        height,
        thickness,
        weight,
      } = req.body;

      const imageHref = `http://localhost:3000/static/images/${file?.filename}`;

      const name = `"${displayInInch} ${manufacturer} ${model} ${builtInMemory} ГБ ${color} ( ${ramSize} ГБ, ${countSimCards} SIM, ${screenResolution}, камера ${backCameraMp} Мп, ${batteryCapacity} мА*ч)`;

      const product = new Product({
        name,
        model,
        manufacturer,
        price,
        file,
        guaranteeInMonths,
        release,
        color,
        supportESim,
        support3G,
        supportLte,
        support5G,
        formatSim,
        countSimCards,
        displayInInch,
        screenResolution,
        aspectRadio,
        countColorIsDisplay,
        updateFrequency,
        materialType,
        osVersion,
        supportGoogleMobileService,
        manufacturerCPU,
        modelCPU,
        countCores,
        frequencyCPU,
        ramSize,
        builtInMemory,
        backCameraMp,
        frontCameraMp,
        versionBluetooth,
        standardWiFi,
        NFC,
        cableInterface,
        batteryCapacity,
        supportQuickCharger,
        supportWirelessCharger,
        width,
        height,
        thickness,
        weight,
        imageHref,
      });

      await product.save();

      return res.status(200).json(product);
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        message: "Возникла ошибка",
        description: "При создании данного продукта возникла проблема",
      });
    }
  }

  async replaceImage(req, res) {
    try {
      const { productId } = req.params;

      const file = req?.files?.[0] || [];

      const product = await Product.findById(productId).exec();

      if (!product) {
        return res.status(400).json({
          message: "Возникла ошибка",
          description: "Такой продукт не найден в базе данных",
        });
      }

      const splitMass = product.imageHref.split("/");

      const oldFileName = splitMass?.[splitMass?.length - 1];

      if (!oldFileName) {
        return res.status(400).json({
          message: "Возникла ошибка",
          description: "Старая фотография этого продукта не найдена",
        });
      }

      await fs.unlinkSync(`public/images/${oldFileName}`);

      product.imageHref = `http://localhost:3000/static/images/${file?.filename}`;

      await product.save();

      return res.status(200).json({ imageHref: product.imageHref });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "Возникла ошибка",
        description: "При замене фотографии товару произошла ошибка",
      });
    }
  }

  async changeProduct(req, res) {
    try {
      const { productId } = req.params;

      const { body } = req;

      const product = await Product.findById(productId).exec();

      if (!product) {
        return res.status(400).json({
          message: "Возникла ошибка",
          description: "Такой продукт не найден в базе данных",
        });
      }

      const name = `"${body?.displayInInch ?? product.displayInInch} ${
        body?.manufacturer ?? product.manufacturer
      } ${body?.model ?? product.model} ${
        body?.builtInMemory ?? product.builtInMemory
      } ГБ ${body?.color ?? product.color} ( ${
        body?.ramSize ?? product.ramSize
      } ГБ, ${body?.countSimCards ?? product.countSimCards} SIM, ${
        body?.screenResolution ?? product.screenResolution
      }, камера ${body?.backCameraMp ?? product.backCameraMp} Мп, ${
        body?.batteryCapacity ?? product.batteryCapacity
      } мА*ч)`;

      product.name = name;
      product.model = body?.model ?? product.model;
      product.manufacturer = body?.manufacturer ?? product.manufacturer;
      product.price = body?.price ?? product.price;
      product.guaranteeInMonths =
        body?.guaranteeInMonths ?? product.guaranteeInMonths;
      product.release = body?.release ?? product.release;
      product.supportESim = body?.supportESim ?? product.supportESim;
      product.support3G = body?.support3G ?? product.support3G;
      product.supportLte = body?.supportLte ?? product.supportLte;
      product.support5G = body?.support5G ?? product.support5G;
      product.formatSim = body?.formatSim ?? product.formatSim;
      product.countSimCards = body?.countSimCards ?? product.countSimCards;
      product.displayInInch = body?.displayInInch ?? product.displayInInch;
      product.screenResolution =
        body?.screenResolution ?? product.screenResolution;
      product.aspectRadio = body?.aspectRadio ?? product.aspectRadio;
      product.countColorIsDisplay =
        body?.countColorIsDisplay ?? product.countColorIsDisplay;
      product.updateFrequency =
        body?.updateFrequency ?? product.updateFrequency;
      product.materialType = body?.materialType ?? product.materialType;
      product.osVersion = body?.osVersion ?? product.osVersion;
      product.supportGoogleMobileService =
        body?.supportGoogleMobileService ?? product.supportGoogleMobileService;
      product.manufacturerCPU =
        body?.manufacturerCPU ?? product.manufacturerCPU;
      product.modelCPU = body?.modelCPU ?? product.modelCPU;
      product.countCores = body?.countCores ?? product.countCores;
      product.frequencyCPU = body?.frequencyCPU ?? product.frequencyCPU;
      product.ramSize = body?.ramSize ?? product.ramSize;
      product.builtInMemory = body?.builtInMemory ?? product.builtInMemory;
      product.backCameraMp = body?.backCameraMp ?? product.backCameraMp;
      product.frontCameraMp = body?.frontCameraMp ?? product.frontCameraMp;
      product.versionBluetooth =
        body?.versionBluetooth ?? product.versionBluetooth;
      product.standardWiFi = body?.standardWiFi ?? product.standardWiFi;
      product.NFC = body?.NFC ?? product.NFC;
      product.cableInterface = body?.cableInterface ?? product.cableInterface;
      product.batteryCapacity =
        body?.batteryCapacity ?? product.batteryCapacity;
      product.supportQuickCharger =
        body?.supportQuickCharger ?? product.supportQuickCharger;
      product.supportWirelessCharger =
        body?.supportWirelessCharger ?? product.supportWirelessCharger;
      product.width = body?.width ?? product.width;
      product.height = body?.height ?? product.height;
      product.thickness = body?.thickness ?? product.thickness;
      product.weight = body?.weight ?? product.weight;
      product.color = body?.color ?? product.color;

      await product.save();

      return res.status(200).json(product);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "Возникла ошибка",
        description: "При редактировании этого продукта возникла ошибка",
      });
    }
  }

  async fetchProductsByClient(req, res) {
    try {
      const {
        page,
        perPage,
        search,
        ramSize,
        manufacturers,
        releases,
        builtInMemory,
        haveNfc,
        fromPrice,
        toPrice,
        sortBy,
        sortDirection,
      } = req.query || {};

      let paramsSearch = {};

      if (search) {
        paramsSearch = {
          $text: {
            $search: search,
            $caseSensitive: false,
          },
        };
      }

      let paramsRamSize = {};

      if (ramSize) {
        paramsRamSize = {
          ramSize: { $in: [...ramSize.split(",")] },
        };
      }

      let paramsManufacturers = {};

      if (manufacturers) {
        paramsManufacturers = {
          manufacturer: { $in: [...manufacturers.split(",")] },
        };
      }

      let paramsReleases = {};

      if (releases) {
        paramsReleases = {
          release: { $in: [...releases.split(",")] },
        };
      }

      let paramsBuiltInMemory = {};

      if (builtInMemory) {
        paramsBuiltInMemory = {
          builtInMemory: { $in: [...builtInMemory.split(",")] },
        };
      }

      let paramsHaveNfc = {};

      if (haveNfc !== undefined) {
        if (haveNfc === "Yes") {
          paramsHaveNfc = {
            NFC: true,
          };
        }
        if (haveNfc === "No") {
          paramsHaveNfc = {
            NFC: false,
          };
        }
      }

      let paramsPriceFilter = {};

      if (
        fromPrice !== "" &&
        fromPrice !== undefined &&
        toPrice !== "" &&
        toPrice !== undefined
      ) {
        paramsPriceFilter = {
          price: { $gte: fromPrice, $lte: toPrice },
        };
      } else if (
        fromPrice !== "" &&
        fromPrice !== undefined &&
        (toPrice === "" || toPrice === undefined)
      ) {
        paramsPriceFilter = {
          price: { $gte: fromPrice },
        };
      } else if (
        (fromPrice === "" || fromPrice === undefined) &&
        toPrice !== "" &&
        toPrice !== undefined
      ) {
        paramsPriceFilter = {
          price: { $lte: toPrice },
        };
      }

      let sortParams = {};

      if (sortBy === "price") {
        if (sortDirection !== undefined) {
          sortParams = {
            price: sortDirection === "asc" ? 1 : -1,
          };
        }
      }

      if (sortBy === "name") {
        if (sortDirection !== undefined) {
          sortParams = {
            name: sortDirection === "asc" ? 1 : -1,
          };
        }
      }

      await Product.paginate(
        {
          $and: [
            paramsSearch,
            paramsRamSize,
            paramsManufacturers,
            paramsReleases,
            paramsBuiltInMemory,
            paramsHaveNfc,
            paramsPriceFilter,
          ],
        },
        {
          page: page || 1,
          limit: perPage || 15,
          customLabels: myCustomLabels,
          sort: sortParams,
        },
        function (err, result) {
          return res.json(result);
        }
      );
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        message: "Возникла ошибка",
        description: "При запросе всех продуктов сайта возникла проблема",
      });
    }
  }
}

module.exports = new products();
