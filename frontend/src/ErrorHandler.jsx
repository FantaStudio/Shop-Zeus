import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import ZeusButton from "./components/System/ZeusButton";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f1f5",
    fontFamily: "'Montserrat', sans-serif",
    minWidth: 400,
  },
  block: {
    padding: 15,
    backgroundColor: "#fff",
    minHeight: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "1rem",
    maxWidth: 400,
    width: "100%",
    flexDirection: "column",
    textAlign: "center",
  },
  btnBlock: {
    display: "flex",
    justifyContent: "center",
    marginTop: 14,
  },
});

const Error = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.block}>
        <div>
          <h2>Внимание вышла новая версия сайта!</h2>

          <p>
            Внимание! Наш сайт был обновлен. Пожалуйста, перезагрузите страницу
          </p>

          <div className={classes.btnBlock}>
            <ZeusButton
              onClick={function () {
                window.location.reload();
              }}
            >
              Перезагрузить страницу
            </ZeusButton>
          </div>
        </div>
      </div>
    </div>
  );
};

class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return <Error />;
    }
    return this.props.children;
  }
}

export default ErrorHandler;
