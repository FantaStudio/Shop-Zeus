import { Divider } from "@material-ui/core";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import products from "../../../store/products";
import CustomCheckboxLabel from "../../System/CustomCheckboxLabel";

const BlockRamSize = view(() => {
  const mapCheckboxes = products.ramSizeVariables.map((item) => {
    return (
      <div key={item}>
        <CustomCheckboxLabel
          checked={products.params.ramSize.includes(item)}
          label={item}
          onChange={(e, checked) => {
            if (checked) {
              products.params.ramSize = [...products.params.ramSize, item];
            } else {
              products.params.ramSize = products.params.v.filter(
                (m) => m !== item
              );
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
          products.params.ramSize.length === products.ramSizeVariables.length
        }
        label="Выбрать все"
        onChange={(e, checked) => {
          if (checked) {
            products.params.ramSize = products.ramSizeVariables;
          } else {
            products.params.ramSize = [];
          }
        }}
      />

      <Divider />

      {mapCheckboxes}
    </div>
  );
});

export default BlockRamSize;
