import { InputAdornment, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useCallback, useEffect, useState } from "react";
import ZeusButton from "./ZeusButton";

const SearchField = ({ onSearch, defaultValue, placeholder }) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const fetch = useCallback(() => {
    onSearch(value);
  }, [onSearch, value]);

  return (
    <TextField
      placeholder={placeholder || "Поиск..."}
      value={value || ""}
      inputProps={{ "aria-label": "поиск" }}
      variant="outlined"
      onChange={onChange}
      style={{ padding: 0 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <ZeusButton
              style={{
                height: 30,
                minWidth: 30,
              }}
              onClick={fetch}
            >
              <Search />
            </ZeusButton>
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  );
};

export default SearchField;
