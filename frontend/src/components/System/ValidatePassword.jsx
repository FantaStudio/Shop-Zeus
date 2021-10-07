import { green, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Check, WarningRounded } from "@material-ui/icons";
import React, { useCallback, useEffect, useState } from "react";

const regularForUppercase = new RegExp("(?=.*?[A-Z])");

const regularForLowerCase = new RegExp("(?=.*?[a-z])");

const regularForOneNumber = new RegExp("(?=.*?[0-9])");

const lengthOfPassword = 8;

const useStyles = makeStyles({
  arrow: {
    width: "auto",
    padding: "5px 10px",
    position: "absolute",
    background: "#fff",
    borderRadius: "3px",
    left: "100%",
    top: "50%",
    transform: "translateY(-50%)",
    boxShadow: "0 3px 6px -2px rgba(0,0,0,0.4)",
    zIndex: 1000,
    whiteSpace: "nowrap",
    "&:before": {
      content: `""`,
      border: "solid transparent",
      position: "absolute",
      right: "100%",
      top: "50%",
      borderRightColor: "#fff",
      borderWidth: "9px",
      marginTop: "-9px",
    },
  },
  arrowTop: {
    width: "auto",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "5px 10px",
    position: "absolute",
    background: "#fff",
    borderRadius: "3px",
    boxShadow: "0 3px 6px -2px rgba(0,0,0,0.4)",
    zIndex: 1000,
    whiteSpace: "nowrap",
    "&:before": {
      content: `""`,
      border: "solid transparent",
      position: "absolute",
      bottom: "100%",
      left: "50%",
      borderBottomColor: "#fff",
      borderWidth: "9px",
      marginLeft: "-9px",
    },
  },
});

const ValidatePassword = ({ value, isDialog }) => {
  const classes = useStyles();

  const [show, setShow] = useState(true);
  const [currentWidth, setCurrentWidth] = useState(
    document.documentElement.clientWidth
  );

  const eventResize = useCallback(() => {
    setCurrentWidth(document.documentElement.clientWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", eventResize);

    return () => {
      window.removeEventListener("resize", eventResize);
    };
  }, [eventResize]);

  const isSmall = isDialog || currentWidth <= 1000;

  useEffect(() => {
    if (
      regularForUppercase.test(value) &&
      regularForLowerCase.test(value) &&
      regularForOneNumber.test(value) &&
      value?.length >= lengthOfPassword
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [value]);

  if (!show) {
    return null;
  }

  return value ? (
    <div
      style={{
        fontSize: "0.8rem",
      }}
      className={!isSmall ? classes.arrow : classes.arrowTop}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {!regularForLowerCase.test(value) ? (
          <>
            <WarningRounded
              style={{ marginRight: "0.5rem", color: red[800] }}
            />
            <span style={{ color: red[800] }}>
              Одна буква в нижнем регистре
            </span>
          </>
        ) : (
          <>
            <Check style={{ marginRight: "0.5rem", color: green[800] }} />
            <span style={{ color: green[800] }}>
              Одна буква в нижнем регистре
            </span>
          </>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {!regularForOneNumber.test(value) ? (
          <>
            <WarningRounded
              style={{ marginRight: "0.5rem", color: red[800] }}
            />
            <span style={{ color: red[800] }}>Одна цифра</span>
          </>
        ) : (
          <>
            <Check style={{ marginRight: "0.5rem", color: green[800] }} />
            <span style={{ color: green[800] }}>Одна цифра</span>
          </>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {!regularForUppercase.test(value) ? (
          <>
            <WarningRounded
              style={{ marginRight: "0.5rem", color: red[800] }}
            />
            <span style={{ color: red[800] }}>
              Одна буква в верхнем регистре
            </span>
          </>
        ) : (
          <>
            <Check style={{ marginRight: "0.5rem", color: green[800] }} />
            <span style={{ color: green[800] }}>
              Одна буква в верхнем регистре
            </span>
          </>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {value?.length < lengthOfPassword ? (
          <>
            <WarningRounded
              style={{ marginRight: "0.5rem", color: red[800] }}
            />
            <span style={{ color: red[800] }}>8 символов или больше</span>
          </>
        ) : (
          <>
            <Check style={{ marginRight: "0.5rem", color: green[800] }} />
            <span style={{ color: green[800] }}>8 символов или больше</span>
          </>
        )}
      </div>
    </div>
  ) : (
    <div
      style={{
        fontSize: "0.8rem",
      }}
      className={!isSmall ? classes.arrow : classes.arrowTop}
    >
      <WarningRounded style={{ marginRight: "0.5rem", color: red[800] }} />
      <span style={{ color: red[800] }}>Пароль обязателен</span>
    </div>
  );
};

export default ValidatePassword;
