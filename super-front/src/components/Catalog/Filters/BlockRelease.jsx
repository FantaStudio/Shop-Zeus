import { Divider } from "@material-ui/core";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import products from "../../../store/products";
import CustomCheckboxLabel from "../../System/CustomCheckboxLabel";

const BlockRelease = view(() => {
  const mapCheckboxes = products.releaseVariables.map((item) => {
    return (
      <div key={item}>
        <CustomCheckboxLabel
          checked={products.params.releases.includes(item)}
          label={item}
          onChange={(e, checked) => {
            if (checked) {
              products.params.releases = [...products.params.releases, item];
            } else {
              products.params.releases = products.params.v.filter(
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
          products.params.releases.length === products.releaseVariables.length
        }
        label="Выбрать все"
        onChange={(e, checked) => {
          if (checked) {
            products.params.releases = products.releaseVariables;
          } else {
            products.params.releases = [];
          }
        }}
      />

      <Divider />

      {mapCheckboxes}
    </div>
  );
});

export default BlockRelease;
