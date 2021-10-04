import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";

const CustomCheckboxLabel = ({
  label,
  disabled,
  id,
  checked,
  onChange,
  name,
  style,
}) => {
  return (
    <FormControlLabel
      labelPlacement="end"
      label={label}
      disabled={disabled}
      style={{ fontFamily: "'Montserrat', sans-serif", userSelect: "none" }}
      control={
        <Checkbox
          checked={checked}
          name={name}
          id={id}
          style={style}
          onChange={(e) => onChange(e, e.target.checked)}
        />
      }
    />
  );
};

export default CustomCheckboxLabel;
