import { Divider } from "@material-ui/core";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import products from "../../../store/products";
import CustomCheckboxLabel from "../../System/CustomCheckboxLabel";

const BlockBuiltInMemory = view(() => {
  const mapCheckboxes = products.builtInMemoryVariables.map((item) => {
    return (
      <div key={item}>
        <CustomCheckboxLabel
          checked={products.params.builtInMemory.includes(item)}
          label={`${item} Гб`}
          onChange={(e, checked) => {
            products.params.page = 1;

            if (checked) {
              products.params.builtInMemory = [
                ...products.params.builtInMemory,
                item,
              ];
            } else {
              products.params.builtInMemory =
                products.params.builtInMemory.filter((m) => m !== item);
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
          products.params.builtInMemory.length ===
          products.builtInMemoryVariables.length
        }
        label="Выбрать все"
        onChange={(e, checked) => {
          products.params.page = 1;

          if (checked) {
            products.params.builtInMemory = products.builtInMemoryVariables;
          } else {
            products.params.builtInMemory = [];
          }
        }}
      />

      <Divider />

      {mapCheckboxes}
    </div>
  );
});

export default BlockBuiltInMemory;
