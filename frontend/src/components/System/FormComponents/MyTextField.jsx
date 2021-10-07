import { InputAdornment, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useRef } from "react";
import { useController } from "react-hook-form";
import { secondaryThemeColor } from "../../../helpers/colors";

const useStyles = makeStyles({
  helperText: {
    fontSize: ".75rem",
  },
  labelDisabled: {
    color: "#444444d9 !important",
  },
  root: {
    fontFamily: "'Montserrat', sans-serif",
  },
  disabled: {
    color: "#282828",
  },
});

const MyTextField = ({
  control,
  name,
  rules,
  helperText,
  disabled,
  label,
  fullWidth,
  endAdornment,
  rows,
  multiline,
  type,
  autoComplete,
  placeholder,
  variant,
  autoFocus,
}) => {
  const classes = useStyles();

  const ref = useRef(false);

  const { field } = useController({
    name: name,
    control: control,
    rules: rules,
  });

  useEffect(() => {
    let timer;
    if (autoFocus) {
      /* без таймаута не работает - но ref.current уже имеет элемент */
      timer = setTimeout(() => {
        ref?.current?.focus();
      }, 300);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [autoFocus]);

  return (
    <TextField
      {...field}
      inputRef={ref}
      color={secondaryThemeColor}
      style={{
        fontFamily: "'Montserrat', sans-serif",
      }}
      disabled={disabled}
      type={type || "text"}
      placeholder={placeholder}
      InputProps={{
        inputProps: {
          autoComplete: autoComplete || "off",
        },
        endAdornment: endAdornment ? (
          <InputAdornment style={{ height: "100%" }} position="end">
            {endAdornment}
          </InputAdornment>
        ) : undefined,
        classes: {
          disabled: classes.disabled,
        },
      }}
      helperText={helperText}
      FormHelperTextProps={{
        className: classes.helperText,
        root: classes.root,
      }}
      InputLabelProps={{
        shrink: true,
        classes: {
          root: classes.root,
          disabled: classes.labelDisabled,
        },
      }}
      label={label}
      fullWidth={fullWidth}
      rows={rows}
      multiline={multiline}
      variant={variant}
    />
  );
};

export default MyTextField;
