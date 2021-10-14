import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useMemo, useRef, useState } from "react";
import SearchField from "../../../System/SearchField";
import admin from "./../../../../store/admin";
import ZeusTable from "./../../../System/ZeusTable";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
    width: "100%",
    height: "100%",
  },
  block: {
    minWidth: 500,
    padding: "15px 20px",
    backgroundColor: "#fff",
    borderRadius: "1rem",
    whiteSpace: "nowrap",
    height: "min-content",
  },
});

const AllClients = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(1);

  const params = useRef({
    page: 1,
    perPage: 1,
  });

  const fetcher = useCallback(async (newParams) => {
    setLoading(true);

    params.current = {
      ...params.current,
      ...newParams,
    };

    const result = await admin.fetchClients(params.current);

    if (result) {
      setItems(result?.data);

      setPages(result?.pages);
    }

    setLoading(false);
  }, []);

  const columns = useMemo(() => {
    return [
      {
        Header: "Имя",
        disableSortBy: true,
        accessor: (rowData) => {
          return rowData?.name;
        },
      },
      {
        Header: "Почта",
        disableSortBy: true,
        accessor: (rowData) => {
          return rowData?.email;
        },
      },
      {
        Header: "Телефон",
        disableSortBy: true,
        accessor: (rowData) => {
          return rowData?.phone;
        },
      },
    ];
  }, []);

  const memoData = useMemo(() => {
    return items;
  }, [items]);

  const onSearch = useCallback(
    (search) => {
      fetcher({ search });
    },
    [fetcher]
  );

  return (
    <div className={classes.root}>
      <div className={classes.block}>
        <SearchField
          onSearch={onSearch}
          defaultValue={params?.current?.search}
          variant="standard"
        />

        <div style={{ height: 15 }} />

        {loading && <LinearProgress />}

        <ZeusTable
          data={memoData}
          fetchData={fetcher}
          columns={columns}
          pageCount={pages}
        />
      </div>
    </div>
  );
};

export default AllClients;
