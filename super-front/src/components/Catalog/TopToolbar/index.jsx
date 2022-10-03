import { makeStyles } from "@material-ui/core/styles";
import { Apps, Toc } from "@material-ui/icons";
import clsx from "clsx";
import React, { useMemo, useState } from "react";
import { secondaryThemeColor } from "../../../helpers/colors";
import products from "../../../store/products";
import CustomSimpleMenu from "../../System/CustomSimpleMenu";

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        padding: ".5rem",
        paddingLeft: "1.5rem",
        backgroundColor: "#fff",
        alignItems: "flex-end",
        marginBottom: "1rem",
        borderRadius: "1rem",
    },
    sortBlock: {
        maxWidth: 200,
        width: "100%",
    },
    rootIcon: {
        cursor: "pointer",
    },
    active: {
        color: secondaryThemeColor,
        cursor: "default",
    },
});

const TopToolbar = ({ showType, setShowType }) => {
    const classes = useStyles();
    const [sortBy, setSortBy] = useState("Cheap");

    const options = useMemo(() => {
        return [
            {
                label: "Сначала дешевые",
                value: "Cheap",
            },
            {
                label: "Сначала дорогие",
                value: "Expensive",
            },
            {
                label: "По наименованию",
                value: "Name",
            },
        ];
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.sortBlock}>
                <CustomSimpleMenu
                    value={sortBy || "Cheap"}
                    onChange={(e, value) => {
                        if (value === "Cheap") {
                            products.params.sortBy = "price";
                            products.params.sortDirection = "asc";
                        }

                        if (value === "Expensive") {
                            products.params.sortBy = "price";
                            products.params.sortDirection = "desc";
                        }

                        if (value === "Name") {
                            products.params.sortBy = "name";
                            products.params.sortDirection = "asc";
                        }

                        setSortBy(value);
                    }}
                    options={options}
                    label="Сортировка"
                    fullWidth
                />
            </div>

            <div>
                <Toc
                    fontSize="large"
                    className={clsx(
                        classes.rootIcon,
                        showType === "Row" && classes.active
                    )}
                    style={{ marginRight: ".8rem" }}
                    onClick={() => {
                        if (showType === "Row") {
                            return;
                        }

                        setShowType("Row");
                        localStorage.setItem("showTypeMarket", "Row");
                    }}
                />

                <Apps
                    fontSize="large"
                    className={clsx(
                        classes.rootIcon,
                        showType === "Grid" && classes.active
                    )}
                    onClick={() => {
                        if (showType === "Grid") {
                            return;
                        }

                        setShowType("Grid");
                        localStorage.setItem("showTypeMarket", "Grid");
                    }}
                />
            </div>
        </div>
    );
};

export default TopToolbar;
