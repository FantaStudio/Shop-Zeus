import { Checkbox, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useController } from "react-hook-form";

const useStyles = makeStyles({
  root: {
    fontFamily: "'Montserrat', sans-serif",
    wordBreak: "break-word",
  },
});

const MyCheckboxLabel = ({ control, name, rules, label, disabled }) => {
  const classes = useStyles();

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
      classes={{
        label: classes.root,
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
