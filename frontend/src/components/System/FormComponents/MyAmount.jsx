import { InputAdornment, TextField } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useController } from "react-hook-form";
import Input from "./Input";

const MyAmount = ({
  autoFocus,
  control,
  name,
  rules,
  disabled,
  label,
  percentage,
  onFocus,
  decimal,
  field: parentField,
  hideBorder,
  style,
}) => {
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
      {...(parentField || field)}
      inputRef={ref}
      onFocus={(e) => {
        if (onFocus) {
          onFocus(e);
        }
      }}
      type="text"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        ...style,
      }}
      InputProps={{
        inputComponent: Input,
        inputProps: {
          autoComplete: "new-password",
          decimal: decimal,
        },
        startAdornment: (
          <InputAdornment position="start">
            <b
              style={{
                fontSize: "1.125rem",
              }}
            >
              {percentage ? "%" : "₽"}
            </b>
          </InputAdornment>
        ),
        disableUnderline: hideBorder,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
      disabled={disabled}
      label={label}
    />
  );
};

export default MyAmount;
