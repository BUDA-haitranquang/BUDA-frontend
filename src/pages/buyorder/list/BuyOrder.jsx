import { useMutation, useQuery } from "@apollo/client";
import { Button, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { DELETE_BUY_ORDER } from "../../../graphQl/buyorders/BuyOrderMutations";
import BuyOrderTableBody from "./components/BuyOrderTableBody";
import { LOAD_BUY_ORDERS } from "../../../graphQl/buyorders/BuyOrderQueries";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { AlertErrorProp } from "../../../buda-components/alert/BudaNoti";
import BudaPaginableTable from "../../../buda-components/table/BudaPaginableTable";

const BuyOrder = () => {
  const { t } = useTranslation("buyorder", { keyPrefix: "list" });

  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [buyOrders, setBuyOrders] = useState({
    count: 0,
    data: [],
  });
  const [filters, setFilters] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  const { error, refetch } = useQuery(LOAD_BUY_ORDERS);
  const [deleteBuyOrder] = useMutation(DELETE_BUY_ORDER);

  const headCells = [
    {
      id: "textID",
      numeric: false,
      disablePadding: false,
      label: t("textId"),
    },
    {
      id: "supplierName",
      numeric: false,
      disablePadding: false,
      label: t("supplierName"),
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: t("status"),
    },
    {
      id: "totalCost",
      numeric: true,
      disablePadding: true,
      label: t("totalCost"),
    },
    {
      id: "createdBy",
      numeric: false,
      disablePadding: true,
      label: t("createdBy"),
    },
    {
      id: "createdAt",
      numeric: false,
      disablePadding: true,
      label: t("createdAt"),
    },
  ];

  /// initialize
  useEffect(() => {
    async function init() {
      const filter = initFilter();
      initData(filter);
    }

    init();
  }, [location.search]);

  /// init filter
  const initFilter = () => {
    const searchPage = queryParams.get("page");
    const searchLimit = queryParams.get("rowsPerPage");
    const searchSupplierName = queryParams.get("supplierName");
    const searchStatus = queryParams.get("status");
    const searchTextId = queryParams.get("textID");
    const searchFrom = queryParams.get("from");
    const searchTo = queryParams.get("to");

    let newFilters = {
      page: searchPage ? parseInt(searchPage) : 0,
      size: searchLimit ? parseInt(searchLimit) : 50,
      supplierName: searchSupplierName,
      status: searchStatus,
      textID: searchTextId,
      from: searchFrom,
      to: searchTo,
    };

    setFilters(newFilters);
    return newFilters;
  };

  /// init data
  const initData = (filter) => {
    refetch({
      ...filter,
    })
      .then((response) => {
        if (response.data) {
          let buyOrdersByUser = [
            ...response.data.buyOrdersByFilter.buyOrders,
          ].map((value) => {
            return {
              buyOrderID: value.buyOrderID,
              textID: value.textID,
              supplierName: value.supplier?.name,
              status: value.status,
              totalCost: value.totalCost,
              createdBy: value.staff?.name,
              createdAt: value.createdAt,
            };
          });

          setBuyOrders((buyOrders) => ({
            ...buyOrders,
            count: response.data.buyOrdersByFilter.count,
            data: buyOrdersByUser,
          }));
        }
      })
      .catch((reason) => enqueueSnackbar(reason, AlertErrorProp));
  };

  // if (error) return <Redirect to="/login" />;

  const handleDelete = (selected) => {
    if (selected === []) return;
    selected.forEach((item) => {
      deleteBuyOrder({
        variables: { buyOrderID: parseInt(item) },
        refetchQueries: [{ query: LOAD_BUY_ORDERS }],
      });
    });
  };

  const handlePageChange = (event, newPage) => {
    const newParams = {
      ...Object.fromEntries(queryParams),
      page: newPage,
    };

    handleChangeQueryString(newParams);
  };

  const handleRowsPerPageChange = (event) => {
    const newParams = {
      ...Object.fromEntries(queryParams),
      page: 0,
      rowsPerPage: event.target.value,
    };

    handleChangeQueryString(newParams);
  };

  const handleSearch = (searchBy, value) => {
    const newParams = {
      [searchBy]: value,
    };

    handleChangeQueryString(newParams);
  };

  const handleChangeQueryString = (filter) => {
    // append filter to URL
    let queryString = "?";
    Object.entries(filter).forEach(([key, value], index) => {
      if (index > 0) {
        queryString = queryString.concat("&");
      }
      if (value.trim().length !== 0) {
        queryString = queryString.concat(key, "=", value.trim());
      }
    });

    // replace current URL
    history.replace({
      search: queryString,
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        m={3}
      >
        <Toolbar />
        <Button
          variant="contained"
          color="primary"
          style={{ alignSelf: "flex-end" }}
          onClick={() => history.push(`/business/buy`)}
        >
          {t("buttonCreate")}
        </Button>
        <BudaPaginableTable
          data={buyOrders.data}
          headCells={headCells}
          onSearch={handleSearch}
          page={filters?.page}
          onPageChange={handlePageChange}
          rowsPerPage={filters?.size}
          onRowsPerPageChange={handleRowsPerPageChange}
          total={buyOrders.count}
          deleteItems={handleDelete}
          DetailTableBody={BuyOrderTableBody}
          type="buyOrderID"
          isNotShowCheckBox={true}
        />
      </Box>
    </Box>
  );
};
export default BuyOrder;
