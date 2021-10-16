import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { view } from "@risingstack/react-easy-state";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import products from "../../store/products"; /* repeat(auto-fill, minmax(500px, 1fr)) */
import ZeusButton from "../System/ZeusButton";
import auth from "./../../store/auth";
import Block from "./components/Block";
import Field from "./components/Field";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 1000,
    margin: "0 auto",
  },
  contentMain: {
    display: "grid",
    backgroundColor: "#fff",
    gridTemplateColumns: "400px 1fr",
    width: "100%",
    gridGap: "12px",
    padding: "10px 15px",
    borderRadius: "1rem",

    "@media (max-width: 800px)": {
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    },
  },
  contentMainImage: {
    width: "100%",
    height: "100%",
  },
  contentMainData: {
    margin: "1rem 0",
  },
  blockName: {
    fontSize: "1.2rem",
    wordBreak: "break-word",
  },
  priceBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "1rem",
    boxShadow: "5px 10px 35px rgba(0,0,0,0.1)",
    padding: "6px 10px",
    maxHeight: 50,
    height: "100%",
    marginTop: "4rem",

    "@media (max-width: 800px)": {
      marginTop: 0,
    },
  },
  blockData: {
    "@media (max-width: 800px)": {
      minHeight: 180,
    },
  },
  price: {
    marginLeft: "1rem",
    fontSize: "1.2rem",
  },
  characteristics: {
    backgroundColor: "#fff",
    width: "100%",
    marginTop: "1rem",
    padding: "10px 15px",
    borderRadius: "1rem",
  },
  characteristicsHeader: {
    marginBottom: "1rem",
  },
  characteristicsContent: {
    display: "flex",
    flexDirection: "column",
  },
});

const ProductDetail = view(() => {
  const match = useRouteMatch();
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const fetchProduct = useCallback(async () => {
    setLoading(true);

    const result = await products.fetchProduct(match?.params?.id);

    if (result) {
      setProduct(result);
    }

    setLoading(false);
  }, [match?.params?.id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const inInsideBasket = auth.productsInBasket.some(
    (item) => item?.id === product?.id
  );

  return (
    <div className={classes.root}>
      <h1 className={classes.characteristicsHeader}>
        Характеристики {product?.name}
      </h1>

      <div className={classes.contentMain}>
        {loading && <LinearProgress />}

        <div>
          <img
            className={classes.contentMainImage}
            alt=""
            src={product?.imageHref}
          />
        </div>

        <div className={classes.blockData}>
          <div className={classes.contentMainData}>
            <p className={classes.blockName}>
              <b>{product?.name}</b>
            </p>
          </div>

          <div className={classes.priceBlock}>
            <div className={classes.price}>
              <b>{`₽ ${product?.price}`}</b>
            </div>

            <ZeusButton
              onClick={() => {
                if (!inInsideBasket) {
                  auth.productsInBasket = [...auth.productsInBasket, product];
                } else {
                  history.push("/shopping-basket");
                }
              }}
              style={{ marginRight: "1rem" }}
            >
              Купить
            </ZeusButton>
          </div>
        </div>
      </div>

      <div className={classes.characteristics}>
        <h2 className={classes.characteristicsHeader}>
          Характеристики {product?.name}
        </h2>

        <div className={classes.characteristicsContent}>
          <Block header="Заводские гарантии">
            <Field
              left="Гарантия"
              right={`${product?.guaranteeInMonths} мес.`}
            />
          </Block>

          <Block header="Общие параметры">
            <Field left="Год релиза" right={`${product?.release}`} />
          </Block>

          <Block header="Внешний вид">
            <Field left="Цвет задней панели" right={`${product?.color}`} />

            <Field
              left="Цвет, заявленный производителем"
              right={`${product?.color}`}
            />

            <Field
              left="Материал корпуса"
              right={`${
                product?.materialType === "Plastic" ? "пластик" : "метал"
              }`}
            />

            <Field left="Ширина" right={`${product?.width} мм`} />

            <Field left="Высота" right={`${product?.height} мм`} />

            <Field left="Толщина" right={`${product?.thickness} мм`} />

            <Field left="Вес" right={`${product?.weight} г`} />
          </Block>

          <Block header="Экран">
            <Field
              left="Диагональ экрана (дюйм)"
              right={`${product?.displayInInch} "`}
            />

            <Field
              left="Разрешения экрана"
              right={`${product?.screenResolution}`}
            />

            <Field
              left="Соотношение сторон"
              right={`${product?.aspectRadio}`}
            />

            <Field
              left="Количество цветов экрана"
              right={`${product?.countColorIsDisplay} тыс.`}
            />

            <Field
              left="Частота обновления экрана"
              right={`${product?.updateFrequency} Гц`}
            />
          </Block>

          <Block header="Камеры">
            <Field
              left="Основная (тыловая) камера"
              right={`${product?.backCameraMp} Мп.`}
            />

            <Field
              left="Фронтальная камера"
              right={`${
                product?.frontCameraMp
                  ? product?.frontCameraMp + " Мп."
                  : "нету"
              }`}
            />
          </Block>

          <Block header="Система">
            <Field left="Версия OS" right={`${product?.osVersion}`} />

            <Field
              left="Поддержка Google Mobile Services"
              right={`${product?.supportGoogleMobileService ? "есть" : "нет"}`}
            />

            <Field
              left="Производитель процессора"
              right={`${product?.manufacturerCPU}`}
            />

            <Field left="Модель процессора" right={`${product?.modelCPU}`} />

            <Field left="Количество ядер" right={`${product?.countCores}`} />

            <Field
              left="Частота работы процессора"
              right={`${product?.frequencyCPU} ГГц`}
            />

            <Field
              left="Объем оперативной памяти"
              right={`${product?.ramSize} Гб`}
            />

            <Field
              left="Объем встроенной памяти"
              right={`${product?.builtInMemory} Гб`}
            />
          </Block>

          <Block header="Мобильная  связь">
            <Field
              left="Поддержка сетей 3G"
              right={`${product?.support3G ? "есть" : "нету"}`}
            />

            <Field
              left="Поддержка сетей 4G (LTE)"
              right={`${product?.supportLte ? "есть" : "нету"}`}
            />

            <Field
              left="Поддержка сетей 5G"
              right={`${product?.support5G ? "есть" : "нету"}`}
            />

            <Field left="Формат SIM-карт" right={`${product?.formatSim}`} />

            <Field
              left="Количество SIM-карт"
              right={`${product?.countSimCards}`}
            />

            <Field
              left="Поддержка eSIM"
              right={`${product?.supportESim ? "есть" : "нету"}`}
            />
          </Block>

          <Block header="Проводные интерфейсы">
            <Field left="Интерфейс" right={`${product?.cableInterface}`} />
          </Block>

          <Block header="Коммуникация">
            <Field
              left="Версия Bluetooth"
              right={`${product?.versionBluetooth}`}
            />

            <Field left="Стандарт Wi-Fi" right={`${product?.standardWiFi}`} />

            <Field left="NFC" right={`${product?.NFC ? "есть" : "нету"}`} />
          </Block>

          <Block header="Питание">
            <Field
              left="Емкость аккумулятора "
              right={`${product?.batteryCapacity} мА*ч`}
            />

            <Field
              left="Поддержка быстрой зарядки"
              right={`${product?.supportQuickCharger ? "есть" : "нету"}`}
            />

            <Field
              left="Поддержка беспроводной зарядки"
              right={`${product?.supportWirelessCharger ? "есть" : "нету"}`}
            />
          </Block>
        </div>
      </div>
    </div>
  );
});

export default ProductDetail;
