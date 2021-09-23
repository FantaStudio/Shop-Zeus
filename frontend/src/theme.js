import { createTheme } from "@material-ui/core/styles";

const mainColor = "#017ac1";

export const theme = createTheme({
  palette: {
    primary: { main: mainColor, contrastText: "#fff" },
    secondary: { main: mainColor, contrastText: "#fff" },
  },
  typography: {
    fontFamily: "'Noto Sans JP', sans-serif",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        a: {
          cursor: "pointer",
          fontWeight: 500,
          color: mainColor,
          transition: "all .2s ease",
          textDecoration: "none",
          letterSpacing: "0.04em",

          "&:hover": {
            color: mainColor,
          },
        },
        body: {
          minWidth: 320,
          backgroundColor: "#fff",
          overflowY: "auto",
          fontFamily: "'Montserrat', sans-serif",
          margin: 0,
        },
        html: {
          margin: 0,
        },
        b: {
          fontWeight: 700,
        },
        "#app": {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "100vh",
        },
        "#component-error-text": {
          color: "red",
        },
        h1: {
          fontWeight: 700,
        },
        h2: {
          fontWeight: 700,
        },
        h3: {
          fontWeight: 700,
        },

        img: {
          maxWidth: "100%",
        },

        ".btn-anim": {
          "& svg": {
            transition: "all .2s ease",
            transform: "translateX(0)",
          },

          "&:hover svg": {
            transform: "translateX(4px)",
          },
        },
      },
    },
    MuiButton: {
      root: {
        marginTop: "1rem",
        backgroundColor: "#fff",
        borderRadius: "3em",
        fontWeight: 500,
        border: `none`,
        color: mainColor,
        transition: "all .3s ease",
        textTransform: "unset",
        letterSpacing: "0.04em",
        height: "auto",
        "&:hover": {
          backgroundColor: mainColor,
          color: "#fff",
        },

        "&$disabled": {
          backgroundColor: "#eee",
        },
      },
    },
    MuiIconButton: {
      root: {
        alignSelf: "flex-start",
      },
    },
    MuiTab: {
      root: {
        textTransform: "unset",

        "@media (min-width: 600px)": {
          minWidth: "auto",
        },
      },
    },
    MuiInputBase: {
      input: {
        "&:-webkit-autofill": {
          transitionDelay: "9999s",
          transitionProperty: "background-color, color",
        },
      },
    },
    MuiInput: {
      underline: {
        "&&&&:before": {
          borderBottom: "2px solid #dedede",
        },
        "&&&&:hover:before": {
          borderBottom: "2px solid #0061a1",
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: "#444444d9",
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: "1.6",
      },
    },
    MuiFormHelperText: {
      root: {
        fontSize: ".9rem",
        lineHeight: "1.6",
        color: "#5f5f5f",
        "&$error": {
          color: "red",
        },
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 10,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "none",
      },
    },
  },
});
