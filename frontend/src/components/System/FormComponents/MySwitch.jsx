import { FormControlLabel, Switch } from "@material-ui/core";
import React from "react";
import { useController } from "react-hook-form";

const MySwitch = ({ control, name, rules, label, disabled }) => {
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
      style={{
        fontFamily: "'Montserrat', sans-serif",
      }}
      control={
        <Switch
          {...props}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          style={{
            fontFamily: "'Montserrat', sans-serif",
          }}
          disabled={disabled}
        />
      }
    />
  );
};

export default MySwitch;
