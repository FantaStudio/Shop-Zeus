import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import products from "../../../../store/products";
import SearchField from "../../../System/SearchField";
import ZeusButton from "./../../../System/ZeusButton";
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

const AllProducts = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(2);

  const params = useRef({
    page: 1,
    perPage: 10,
  });

  const fetcher = useCallback(async (newParams) => {
    setLoading(true);

    params.current = {
      ...params.current,
      ...newParams,
    };

    const result = await products.fetchProductsByAdmin(params.current);

    if (result) {
      setItems(result?.data);

      setPages(result?.pages);
    }

    setLoading(false);
  }, []);

  const columns = useMemo(() => {
    return [
      {
        Header: "Название",
        disableSortBy: true,
        accessor: (rowData) => {
          return (
            <Link to={`/admin/all-products/${rowData?._id}`}>
              {rowData?.name}
            </Link>
          );
        },
      },
      {
        Header: "Цена",
        disableSortBy: true,
        accessor: (rowData) => {
          return `₽ ${rowData?.price}`;
        },
      },
    ];
  }, []);

  const memoData = useMemo(() => {
    return items;
  }, [items]);

  const onSearch = useCallback(
    (search) => {
      fetcher({ search, page: 1 });
    },
    [fetcher]
  );

  return (
    <div className={classes.root}>
      <div className={classes.block}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ZeusButton component={Link} to="/admin/all-products/create">
            Создать
          </ZeusButton>
        </div>

        <div style={{ height: 15 }} />

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

export default AllProducts;
