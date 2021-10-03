import { MenuItem, TextField } from "@material-ui/core";
import React from "react";

const CustomSimpleMenu = ({
  value,
  onChange,
  disabled,
  label,
  fullWidth,
  options,
  style = {},
  name,
}) => {
  const mapOptions = (options || []).map((item) => (
    <MenuItem key={item.value} value={item.value}>
      {item.label}
    </MenuItem>
  ));

  return (
    <TextField
      name={name}
      value={value}
      InputLabelProps={{
        shrink: true,
      }}
      style={{ fontFamily: "'Montserrat', sans-serif", ...style }}
      onChange={(e) => onChange(e, e.target.value)}
      label={label}
      disabled={disabled}
      fullWidth={fullWidth}
      select
    >
      {mapOptions}
    </TextField>
  );
};

export default CustomSimpleMenu;
