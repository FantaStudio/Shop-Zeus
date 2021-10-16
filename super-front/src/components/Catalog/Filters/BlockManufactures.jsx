import { Divider } from "@material-ui/core";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import products from "../../../store/products";
import CustomCheckboxLabel from "../../System/CustomCheckboxLabel";

const BlockManufactures = view(() => {
  const mapCheckboxes = products.manufacturesVariables.map((item) => {
    return (
      <div key={item}>
        <CustomCheckboxLabel
          checked={products.params.manufacturers.includes(item)}
          label={item}
          onChange={(e, checked) => {
            products.params.page = 1;

            if (checked) {
              products.params.manufacturers = [
                ...products.params.manufacturers,
                item,
              ];
            } else {
              products.params.manufacturers =
                products.params.manufacturers.filter((m) => m !== item);
            }
          }}
        />
      </div>
    );
  });

  return (
    <div>
      <CustomCheckboxLabel
        checked={
          products.params.manufacturers.length ===
          products.manufacturesVariables.length
        }
        label="Выбрать все"
        onChange={(e, checked) => {
          products.params.page = 1;

          if (checked) {
            products.params.manufacturers = products.manufacturesVariables;
          } else {
            products.params.manufacturers = [];
          }
        }}
      />

      <Divider />

      {mapCheckboxes}
    </div>
  );
});

export default BlockManufactures;
