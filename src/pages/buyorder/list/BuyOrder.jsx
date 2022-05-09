import { useMutation, useQuery } from "@apollo/client";
import { Button, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { DELETE_BUY_ORDER } from "../../../graphQl/buyorders/BuyOrderMutations";
import Sidebar from "../../../components/Sidebar";
import BuyOrderTableBody from "./components/BuyOrderTableBody";
import { LOAD_BUY_ORDERS } from "../../../graphQl/buyorders/BuyOrderQueries";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { AlertErrorProp } from "../../../buda-components/alert/BudaNoti";
import BudaPaginableTable from "../../../buda-components/table/BudaPaginableTable";

const BuyOrder = (props) => {
  // const { window } = props;
  const { t } = useTranslation("buyorder", { keyPrefix: "list" });
  const [buyOrders, setBuyOrders] = useState([]);
  const history = useHistory();
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

  /// search by
  const queryParams = new URLSearchParams(window.location.search);
  const searchPage = queryParams.get("page");
  const searchLimit = queryParams.get("limit");
  const searchSupplierName = queryParams.get("supplierName");
  const searchStatus = queryParams.get("status");
  const searchTextId = queryParams.get("textId");
  const searchFrom = queryParams.get("from");
  const searchTo = queryParams.get("to");

  /// đoạn này về sau có thể ốp TypeScript vào (type của nó sẽ bao gồm
  /// page, rowsPerPage và một số filter khác)
  useEffect(() => {
    const handleRefetchData = async () => {
      return refetch({
        page: searchPage ? parseInt(searchPage) : 0,
        size: searchLimit ? parseInt(searchLimit) : 50,
        // supplierName: searchSupplierName,
        // status: searchStatus,
        // textId: searchTextId,
        // from: searchFrom,
        // to: searchTo,
      });
    };

    handleRefetchData()
      .then((response) => {
        if (response.data) {
          let buyOrdersByUser = [...response.data.buyOrdersByUser].map(
            (value) => {
              return {
                buyOrderID: value.buyOrderID,
                textID: value.textID,
                supplierName: value.supplier?.name,
                status: value.status,
                totalCost: value.totalCost,
                createdBy: value.staff?.name,
                createdAt: value.createdAt,
              };
            }
          );
          setBuyOrders(buyOrdersByUser);
        }
      })
      .catch((reason) => enqueueSnackbar(reason, AlertErrorProp));
  }, [
    searchPage,
    searchLimit,
    searchSupplierName,
    searchStatus,
    searchTextId,
    searchFrom,
    searchTo,
  ]);

  if (error) return <Redirect to="/login" />;

  const handleDelete = (selected) => {
    if (selected === []) return;
    selected.forEach((item) => {
      deleteBuyOrder({
        variables: { buyOrderID: parseInt(item) },
        refetchQueries: [{ query: LOAD_BUY_ORDERS }],
      });
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name={t("title")} id="business" />
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
          deleteItems={handleDelete}
          data={buyOrders}
          headCells={headCells}
          DetailTableBody={BuyOrderTableBody}
          type="buyOrderID"
          isNotShowCheckBox={true}
          history={history}
        />
      </Box>
    </Box>
  );
};
export default BuyOrder;
