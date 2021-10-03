import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import SearchField from "../../System/SearchField";
import CollapsingBlock from "./components/CollapsingBlock";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    width: "100%",
    height: "min-content",
    backgroundColor: "#fff",
    borderRadius: "1rem",
    padding: ".8rem",
  },
});

/* 
Фильтра

- Поиск
- Наличие в магазинах
- Цена 
- Производитель
- Год релиза
- Объем встроенной памяти (ГБ)
- Объем оперативной памяти
- NFC
- Емкость аккумулятора 
- Операционная система
- Диагональ экрана
- Количество сим-карт
- Количество ядер

*/

const Filters = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SearchField />

      <CollapsingBlock title="Наличие в магазинах">
        <div>11</div>
      </CollapsingBlock>

      <CollapsingBlock title="Цена">
        <div>11</div>
      </CollapsingBlock>

      <CollapsingBlock title="Производитель">
        <div>11</div>
      </CollapsingBlock>

      <CollapsingBlock title="Год релиза">
        <div>11</div>
      </CollapsingBlock>

      <CollapsingBlock title="Объем встроенной памяти">
        <div>11</div>
      </CollapsingBlock>

      <CollapsingBlock title="Объем оперативной памяти">
        <div>11</div>
      </CollapsingBlock>

      <CollapsingBlock title="NFC">
        <div>11</div>
      </CollapsingBlock>

      <CollapsingBlock title="Емкость аккумулятора">
        <div>11</div>
      </CollapsingBlock>

      <CollapsingBlock title="Операционная система">
        <div>11</div>
      </CollapsingBlock>

      <CollapsingBlock title="Диагональ экрана">
        <div>11</div>
      </CollapsingBlock>

      <CollapsingBlock title="Количество сим-карт">
        <div>11</div>
      </CollapsingBlock>

      <CollapsingBlock title="Количество ядер">
        <div>11</div>
      </CollapsingBlock>
    </div>
  );
};

export default Filters;
