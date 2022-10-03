import { makeStyles } from "@material-ui/core/styles";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import { Link } from "react-router-dom";
import auth from "../../store/auth";

const useStyles = makeStyles({
    root: {
        width: 120,
        height: "auto",
    },
    image: {
        width: "100%",
        height: "100%",
    },
});

const Logo = view(() => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Link
                to={
                    auth?.profile?.roles?.includes("Admin")
                        ? "/admin/all-clients"
                        : "/"
                }
            >
                <img
                    src="/images/Logotip.svg"
                    alt="logo"
                    className={classes.image}
                />
            </Link>
        </div>
    );
});

export default Logo;
