import { view } from "@risingstack/react-easy-state";
import React from "react";
import products from "../../../store/products";
import CustomTextField from "./../../System/CustomTextField";

const BlockPrice = view(() => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginRight: ".3rem",
      }}
    >
      <div style={{ width: 150 }}>
        <CustomTextField
          value={products.params.fromPrice || ""}
          placeholder="От"
          onChange={(e, value) => {
            products.params.page = 1;
            products.params.fromPrice = value;
          }}
          fullWidth
        />{" "}
      </div>

      <div style={{ width: 150 }}>
        <CustomTextField
          value={products.params.toPrice || ""}
          placeholder="До"
          onChange={(e, value) => {
            products.params.page = 1;
            products.params.toPrice = value;
          }}
          fullWidth
        />
      </div>
    </div>
  );
});

export default BlockPrice;
