import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";
import { useController } from "react-hook-form";

const MyCheckboxLabel = ({ control, name, rules, label, disabled }) => {
  const { field } = useController({
    name: name,
    control: control,
    rules: rules,
  });

  const { onChange, value, ...props } = field;

  return (
    <FormControlLabel
      labelPlacement="end"
      label={label}
      disabled={disabled}
      style={{
        fontFamily: "'Montserrat', sans-serif",
      }}
      control={
        <Checkbox
          {...props}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
      }
    />
  );
};

export default MyCheckboxLabel;
