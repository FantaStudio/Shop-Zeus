import { makeStyles } from "@material-ui/core/styles";
import { Apps, Toc } from "@material-ui/icons";
import clsx from "clsx";
import React, { useMemo } from "react";
import { secondaryThemeColor } from "../../../helpers/colors";
import CustomSimpleMenu from "../../System/CustomSimpleMenu";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: ".5rem",
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

const TopToolbar = ({ showType, setShowType, sortType, setSortType }) => {
  const classes = useStyles();

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
        label: "Сначала популярные",
        value: "Popular",
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
          value={sortType}
          onChange={(e, value) => {
            setSortType(value);
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
