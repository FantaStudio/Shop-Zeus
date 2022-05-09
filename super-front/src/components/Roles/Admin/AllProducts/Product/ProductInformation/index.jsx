import { Divider, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import products from "../../../../../../store/products";
import Field from "../../../../../ProductDetail/components/Field";
import ZeusButton from "./../../../../../System/ZeusButton";
import ReplaceImage from "./ReplaceImage";

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
    maxWidth: 800,
    width: "100%",
    padding: "15px 20px",
    backgroundColor: "#fff",
    borderRadius: "1rem",
    whiteSpace: "nowrap",
    height: "min-content",
  },
});

const DetailInformation = () => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();

  const [openReplaceImage, setOpenReplaceImage] = useState(false);

  const { id } = match.params;

  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({});

  const fetchDetail = useCallback(async () => {
    setLoading(true);

    const result = await products.fetchProduct(id);

    if (result) {
      setDetail(result);
    }

    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return (
    <>
      <div className={classes.root}>
        <h1>Просмотр продукта ({detail?.model})</h1>
        <div className={classes.block}>
          {loading && <LinearProgress />}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              flexDirection: "column",
            }}
          >
            <img
              style={{ width: 300 }}
              id="image"
              alt=""
              src={detail?.imageHref}
            />

            <ZeusButton
              style={{ marginTop: ".6rem" }}
              onClick={() => setOpenReplaceImage(true)}
            >
              Заменить изображение
            </ZeusButton>
          </div>

          <Divider />

          <Field left="Цена" right={`₽ ${detail?.price}`} />

          <Field left="Модель" right={detail?.model} />

          <Field left="Производитель" right={detail?.manufacturer} />

          <Field left="Гарантия" right={`${detail?.guaranteeInMonths} мес.`} />

          <Field left="Год релиза" right={`${detail?.release}`} />

          <Field left="Цвет задней панели" right={`${detail?.color}`} />

          <Field
            left="Цвет, заявленный производителем"
            right={`${detail?.color}`}
          />

          <Field
            left="Материал корпуса"
            right={`${
              detail?.materialType === "Plastic" ? "пластик" : "метал"
            }`}
          />

          <Field left="Ширина" right={`${detail?.width} мм`} />

          <Field left="Высота" right={`${detail?.height} мм`} />

          <Field left="Толщина" right={`${detail?.thickness} мм`} />

          <Field left="Вес" right={`${detail?.weight} г`} />

          <Field
            left="Диагональ экрана (дюйм)"
            right={`${detail?.displayInInch} "`}
          />

          <Field
            left="Разрешения экрана"
            right={`${detail?.screenResolution}`}
          />

          <Field left="Соотношение сторон" right={`${detail?.aspectRadio}`} />

          <Field
            left="Количество цветов экрана"
            right={`${detail?.countColorIsDisplay} тыс.`}
          />

          <Field
            left="Частота обновления экрана"
            right={`${detail?.updateFrequency} Гц`}
          />

          <Field
            left="Основная (тыловая) камера"
            right={`${detail?.backCameraMp} Мп.`}
          />

          <Field
            left="Фронтальная камера"
            right={`${
              detail?.frontCameraMp
                ? detail?.frontCameraMp + " Мп."
                : "отсутствует"
            }`}
          />

          <Field left="Версия OS" right={`${detail?.osVersion}`} />

          <Field
            left="Поддержка Google Mobile Services"
            right={`${
              detail?.supportGoogleMobileService ? "есть" : "отсутствует"
            }`}
          />

          <Field
            left="Производитель процессора"
            right={`${detail?.manufacturerCPU}`}
          />

          <Field left="Модель процессора" right={`${detail?.modelCPU}`} />

          <Field left="Количество ядер" right={`${detail?.countCores}`} />

          <Field
            left="Частота работы процессора"
            right={`${detail?.frequencyCPU} ГГц`}
          />

          <Field
            left="Объем оперативной памяти"
            right={`${detail?.ramSize} Гб`}
          />

          <Field
            left="Объем встроенной памяти"
            right={`${detail?.builtInMemory} Гб`}
          />

          <Field
            left="Поддержка сетей 3G"
            right={`${detail?.support3G ? "есть" : "отсутствует"}`}
          />

          <Field
            left="Поддержка сетей 4G (LTE)"
            right={`${detail?.supportLte ? "есть" : "отсутствует"}`}
          />

          <Field
            left="Поддержка сетей 5G"
            right={`${detail?.support5G ? "есть" : "отсутствует"}`}
          />

          <Field left="Формат SIM-карт" right={`${detail?.formatSim}`} />

          <Field
            left="Количество SIM-карт"
            right={`${detail?.countSimCards}`}
          />

          <Field
            left="Поддержка eSIM"
            right={`${detail?.supportESim ? "есть" : "отсутствует"}`}
          />
          <Field left="Интерфейс" right={`${detail?.cableInterface}`} />

          <Field
            left="Версия Bluetooth"
            right={`${detail?.versionBluetooth}`}
          />

          <Field left="Стандарт Wi-Fi" right={`${detail?.standardWiFi}`} />

          <Field left="NFC" right={`${detail?.NFC ? "есть" : "отсутствует"}`} />

          <Field
            left="Емкость аккумулятора "
            right={`${detail?.batteryCapacity} мА*ч`}
          />

          <Field
            left="Поддержка быстрой зарядки"
            right={`${detail?.supportQuickCharger ? "есть" : "отсутствует"}`}
          />

          <Field
            left="Поддержка беспроводной зарядки"
            right={`${detail?.supportWirelessCharger ? "есть" : "отсутствует"}`}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <ZeusButton
              onClick={() =>
                history.push(`/admin/all-products/${id}/edit`, { detail })
              }
            >
              Редактировать
            </ZeusButton>
          </div>
        </div>
      </div>

      {openReplaceImage && (
        <ReplaceImage
          open={openReplaceImage}
          setOpen={setOpenReplaceImage}
          productId={id}
          setDetail={setDetail}
        />
      )}
    </>
  );
};

export default DetailInformation;
