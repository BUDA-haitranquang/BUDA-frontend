import { Box, Button, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import SellOrderTableBody from "../../../components/table/body/SellOrderTableBody";
//@ts-ignore
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTranslation } from "react-i18next";
import { AlertErrorProp } from "../../../buda-components/alert/BudaNoti";
import { Redirect, useLocation } from "react-router-dom";
import BudaPaginableTable from "../../../buda-components/table/BudaPaginableTable";
import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "@apollo/client";
import { LOAD_SELL_ORDER } from "../../../graphQl/sellOrder/sellOrderQueries";
import { DELETE_SELL_ORDER } from "../../../graphQl/sellOrder/SellOrderMutation";
import { capitalizeFirstLetter } from "../../../utils/utils";

const SellOrderList = (props: any) => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [sellOrders, setSellOrders] = useState({
    count: 0,
    data: [],
  });
  const [filters, setFilters] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  const { error, refetch } = useQuery(LOAD_SELL_ORDER);
  const [deleteSellOrder] = useMutation(DELETE_SELL_ORDER);

  const { t } = useTranslation("sellOrderHistory");

  const headCells = [
    {
      id: "textID",
      numeric: false,
      disablePadding: false,
      label: t("sellOrderHistory:table.textID"),
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
      textID: searchTextId,
      from: searchFrom,
      to: searchTo,
    };

    setFilters(newFilters);
    return newFilters;
  };

  /// init data
  const initData = (filter: any) => {
    refetch({
      ...filter,
    })
      .then((response) => {
        if (response.data && response.data.sellOrdersByFilter) {
          let sellOrdersByUser = [
            ...response.data.sellOrdersByFilter.sellOrders,
          ].map((item) => {
            return {
              id: item.sellOrderID,
              customerName: item.customer?.name,
              sellOrderID: item.textID,
              finalCost: item.finalCost,
              creationTime: item.creationTime,
              finishTime: item.finishTime,
              status: capitalizeFirstLetter(item.status),
            };
          });

          setSellOrders((sellOrders) => ({
            ...sellOrders,
            count: response.data.sellOrdersByFilter.count,
            data: sellOrdersByUser,
          }));
        }
      })
      .catch((reason) => enqueueSnackbar(reason, AlertErrorProp as any));
  };

  const handleDelete = (selected: Array<any>) => {
    if (selected === []) return;
    selected.forEach((item: any) => {
      deleteSellOrder({
        variables: { buyOrderID: parseInt(item) },
        refetchQueries: [{ query: LOAD_SELL_ORDER }],
      });
    });
  };

  const handlePageChange = (event: any, newPage: any) => {
    const newParams = {
      ...Object.fromEntries(queryParams),
      page: newPage,
    };

    handleChangeQueryString(newParams);
  };

  const handleRowsPerPageChange = (event: any) => {
    const newParams = {
      ...Object.fromEntries(queryParams),
      page: 0,
      rowsPerPage: event.target.value,
    };

    handleChangeQueryString(newParams);
  };

  const handleSearch = (searchBy: any, value: any) => {
    const newParams = {
      [searchBy]: value,
    };

    handleChangeQueryString(newParams);
  };

  const handleChangeQueryString = (filter: any) => {
    // append filter to URL
    let queryString = "?";
    Object.entries(filter).forEach(([key, value], index) => {
      if (index > 0) {
        queryString = queryString.concat("&");
      }
      if ((value as string).trim().length !== 0) {
        queryString = queryString.concat(key, "=", (value as string).trim());
      }
    });

    // replace current URL
    history.replace({
      search: queryString,
    });
  };

  return (
    <Box sx={{ display: "flex", margin: "6px" }}>
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
          data={sellOrders.data}
          headCells={headCells}
          onSearch={handleSearch}
          //@ts-ignore
          page={filters?.page}
          onPageChange={handlePageChange}
          //@ts-ignore
          rowsPerPage={filters?.size}
          onRowsPerPageChange={handleRowsPerPageChange}
          total={sellOrders.count || 0}
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
