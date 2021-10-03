import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    width: "100%",
    height: "min-content",
    backgroundColor: "#fff",
    borderRadius: "1rem",
    padding: ".5rem",
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

  return <div className={classes.root}>11</div>;
};

export default Filters;
