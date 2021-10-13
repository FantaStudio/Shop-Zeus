import React from "react";
import { useWatch } from "react-hook-form";
import ValidatePassword from "./../System/ValidatePassword";

const WrapValidatePassword = ({ control, name, errors = {}, isDialog }) => {
  const value = useWatch({
    control: control,
    name: name,
  });

  return (
    errors[name]?.type === "valid" && (
      <ValidatePassword value={value} isDialog={isDialog} />
    )
  );
};

export default WrapValidatePassword;
