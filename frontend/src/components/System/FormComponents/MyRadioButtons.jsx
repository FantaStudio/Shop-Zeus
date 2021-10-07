import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useController } from "react-hook-form";

const useStyles = makeStyles({
  labelRoot: {
    color: "#282828",
  },
  label: {
    fontSize: ".85rem",
  },
});

const MyRadioButtons = ({ control, items, name, label, rules, row }) => {
  const classes = useStyles();

  const { field } = useController({
    name: name,
    control: control,
    rules: rules,
  });

  const { onChange, ...props } = field;

  const makeItems = items.map((item) => {
    return (
      <div key={item.label}>
        <FormControlLabel
          label={item.label}
          style={{
            fontFamily: "'Montserrat', sans-serif",
          }}
          control={
            <Radio
              id={item?.id}
              disabled={item?.disabled}
              data-cy={item?.dataCy}
              value={item.value}
              style={{
                fontFamily: "'Montserrat', sans-serif",
              }}
            />
          }
          classes={{
            root: classes.labelRoot,
            label: classes.label,
          }}
        />
        {item.view}
      </div>
    );
  });

  return (
    <FormControl component="div">
      <FormLabel
        component="label"
        filled
        root
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: ".85rem",
        }}
      >
        {label}
      </FormLabel>
      <RadioGroup
        row={row}
        {...props}
        onChange={(e) => {
          const { value } = e.target;

          if (value === "true" || value === "false") {
            if (value === "true") {
              onChange(true);
            } else {
              onChange(false);
            }
          } else {
            onChange(e.target.value);
          }
        }}
      >
        {makeItems}
      </RadioGroup>
    </FormControl>
  );
};

export default MyRadioButtons;
