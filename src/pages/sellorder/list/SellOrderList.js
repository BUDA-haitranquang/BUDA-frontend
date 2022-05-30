import { Box, Button, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import SellOrderTableBody from "../../../components/table/body/SellOrderTableBody";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTranslation } from "react-i18next";
import { AlertErrorProp } from "../../../buda-components/alert/BudaNoti";
import { Redirect, useLocation } from "react-router-dom";
import BudaPaginableTable from "../../../buda-components/table/BudaPaginableTable";
import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "@apollo/client";
import { LOAD_SELL_ORDER } from "../../../graphQl/sellOrder/SellOrderQueries";
import { DELETE_SELL_ORDER } from "../../../graphQl/sellOrder/SellOrderMutation";
import { capitalizeFirstLetter } from "../../../utils/utils";

const SellOrderList = (props) => {
  const { window } = props;

  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [sellOrders, setSellOrders] = useState([]);
  const [filters, setFilters] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  const { error, refetch } = useQuery(LOAD_SELL_ORDER);
  const [deleteSellOrder] = useMutation(DELETE_SELL_ORDER);

  const { t } = useTranslation("sellOrderHistory");

  const headCells = [
    {
      id: "sellOrderID",
      numeric: false,
      disablePadding: false,
      label: "ID",
    },
    {
      id: "customerName",
      numeric: false,
      disablePadding: true,
      label: t("sellOrderHistory:table.customer"),
    },
    {
      id: "finalCost",
      numeric: true,
      disablePadding: true,
      label: t("sellOrderHistory:table.finalCost"),
    },
    {
      id: "creationTime",
      numeric: true,
      disablePadding: true,
      label: t("sellOrderHistory:table.creationTime"),
    },
    {
      id: "finishTime",
      numeric: true,
      disablePadding: true,
      label: t("sellOrderHistory:table.finishTime"),
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: t("sellOrderHistory:table.status"),
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
    const searchCustomerName = queryParams.get("customerName");
    const searchStatus = queryParams.get("status");
    const searchTextId = queryParams.get("textID");
    const searchFrom = queryParams.get("from");
    const searchTo = queryParams.get("to");

    let newFilters = {
      page: searchPage ? parseInt(searchPage) : 0,
      size: searchLimit ? parseInt(searchLimit) : 50,
      customerName: searchCustomerName,
      status: searchStatus,
      textId: searchTextId,
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
          let sellOrdersByUser = [...response.data.sellOrdersByUser].map(
            (item) => {
              return {
                id: item.sellOrderID,
                customerName: item.customer?.name,
                sellOrderID: item.textID,
                finalCost: item.finalCost,
                creationTime: item.creationTime,
                finishTime: item.finishTime,
                status: capitalizeFirstLetter(item.status),
              };
            }
          );
          setSellOrders(sellOrdersByUser);
        }
      })
      .catch((reason) => enqueueSnackbar(reason, AlertErrorProp));
  };

  if (error) return <Redirect to="/login" />;

  const handleDelete = (selected) => {
    if (selected === []) return;
    selected.forEach((item) => {
      deleteSellOrder({
        variables: { buyOrderID: parseInt(item) },
        refetchQueries: [{ query: LOAD_SELL_ORDER }],
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
      queryString = queryString.concat(key, "=", value);
    });

    // replace current URL
    history.replace({
      search: queryString,
    });
  };

  return (
    <Box sx={{ display: "flex", margin: "6px" }}>
      <Sidebar
        window={window}
        name={t("sellOrderHistory:title")}
        id="business"
      />
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
          onClick={() => history.push(`/business/sell`)}
        >
          {t("sellOrderHistory:createSellOrder")}
        </Button>

        <BudaPaginableTable
          data={sellOrders}
          headCells={headCells}
          onSearch={handleSearch}
          page={filters?.page}
          onPageChange={handlePageChange}
          rowsPerPage={filters?.size}
          onRowsPerPageChange={handleRowsPerPageChange}
          total={600}
          deleteItems={handleDelete}
          DetailTableBody={SellOrderTableBody}
          type="buyOrderID"
          isNotShowCheckBox={true}
        />
      </Box>
    </Box>
  );
};

export default SellOrderList;
