import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  labelRoot: {
    color: "#282828",
  },
});

const CustomRadioButtons = ({
  value,
  items,
  label,
  row,
  disabled,
  onChange,
  name,
}) => {
  const classes = useStyles();

  const makeItems = items.map((item) => {
    return (
      <FormControlLabel
        key={item.label}
        label={item.label}
        control={<Radio disabled={disabled} value={item.value} />}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
        classes={{
          root: classes.labelRoot,
        }}
      />
    );
  });

  return (
    <FormControl component="fieldset">
      <FormLabel
        component="legend"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {label}
      </FormLabel>
      <RadioGroup
        name={name}
        row={row}
        value={value}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
        onChange={(e) => {
          const { value } = e.target;

          if (value === "true" || value === "false") {
            if (value === "true") {
              onChange(e, true);
            } else {
              onChange(e, false);
            }
          } else {
            onChange(e, e.target.value);
          }
        }}
      >
        {makeItems}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioButtons;
