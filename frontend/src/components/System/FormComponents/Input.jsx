import Cleave from "cleave.js/react";
import React from "react";

const Input = ({ inputRef, decimal, ...props }) => {
  const options = {
    numeral: true,
    numeralDecimalScale: 2,
  };

  if (decimal !== undefined) {
    options.numeralDecimalScale = decimal;
  }

  return (
    <Cleave
      ref={(ref) => inputRef(ref ? ref?.element : null)}
      {...props}
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      htmlRef={inputRef}
      options={{ ...options }}
    />
  );
};

export default Input;
