import { Close, Menu } from "@material-ui/icons";
import React, { useState } from "react";
import ZeusButton from "./System/ZeusButton";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div id="main-content">
        <ZeusButton onClick={open ? () => setOpen(false) : () => setOpen(true)}>
          {open ? <Close /> : <Menu />}
          Каталог
        </ZeusButton>
      </div>
    </header>
  );
};

export default Header;
