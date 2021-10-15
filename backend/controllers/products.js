const Product = require("../models/Product");

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
}

module.exports = new products();
