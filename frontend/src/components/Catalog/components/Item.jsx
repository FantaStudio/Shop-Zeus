import { makeStyles } from "@material-ui/core/styles";
import React, { memo } from "react";

const useStyles = makeStyles({
  root: {},
});

const Item = memo(({ showType }) => {
  const classes = useStyles();

  return (
    <div>
      <div></div> {/* Картинка */}
      <div></div> {/* Название */}
      <div></div> {/* Цена и купить */}
    </div>
  );
});

export default Item;
