import { useMutation, useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../buda-components/alert/BudaNoti";
import BudaTable from "../buda-components/table/BudaTable";
import AddCustomerModal from "../components/modal/AddCustomerModal";
import Sidebar from "../components/Sidebar";
import CustomerTableBody from "../components/table/body/CustomerTableBody";
import { HIDE_CUSTOMER_MUTATION } from "../graphQl/customers/customersMutations";
import { LOAD_CUSTOMERS } from "../graphQl/customers/customersQueries";

const Customer = (props) => {
  const { window } = props;
  const [customer, setCustomer] = useState([]);
  const { error, loading, data } = useQuery(LOAD_CUSTOMERS);
  const [isLoading, setIsLoading] = useState(false);
  const [hideCustomer] = useMutation(HIDE_CUSTOMER_MUTATION);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(["common", "customer"]);

  const handleDelete = (selected) => {
    if (selected === []) return;
    setIsLoading(true);
    try {
      selected.forEach((item) => {
        hideCustomer({
          variables: { customerID: parseInt(item) },
          refetchQueries: [{ query: LOAD_CUSTOMERS }],
        });
      });
      enqueueSnackbar("Delete item(s) successfully", AlertSuccessProp);
    } catch (e) {
      enqueueSnackbar("An error occured", AlertErrorProp);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (data) setCustomer(data.customersByUser.map((item) => item));
    }

    fetchData();
    console.log(data);
  }, [data]);

  if (error) return <Redirect to="/login" />;

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: t("customer:customerName"),
    },
    {
      id: "phoneNumber",
      numeric: false,
      disablePadding: false,
      label: t("customer:phoneNumber"),
    },
    {
      id: "ageGroup",
      numeric: false,
      disablePadding: false,
      label: t("customer:ageGroup"),
    },
    {
      id: "gender",
      numeric: false,
      disablePadding: false,
      label: t("customer:gender"),
    },
    {
      id: "totalSpend",
      numeric: true,
      disablePadding: false,
      label: t("customer:totalSpend"),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name={t("customer:customer")} id="customer"/>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Toolbar />
        <Box>{}</Box>
        <Box>
          <BudaTable
            deleteItems={handleDelete}
            data={customer.reverse()}
            headCells={headCells}
            Modal={AddCustomerModal}
            type="customerID"
            DetailTableBody={CustomerTableBody}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Customer;
