import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import DiscountByCashTableBody from "../table/body/DiscountByCashTableBody";
import BudaTable from "../../buda-components/table/BudaTable";
import { useSnackbar } from "notistack";
import { AlertErrorProp, AlertSuccessProp } from "../../buda-components/alert/BudaNoti";
import AddDiscountModal from "../modal/AddDiscountModals";
import { LOAD_DISCOUNTS } from "../../graphQl/discounts/discountQueries";
import { DELETE_DISCOUNTS_MUTATION } from "../../graphQl/discounts/discountMutations";

const headCells = [
  {
    id: "discountCode",
    numeric: false,
    disablePadding: false,
    label: "Code"
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name"
  },
  {
    id: "cash",
    numeric: true,
    disablePadding: true,
    label: "Cash"
  },
  {
    id: "cashLimit",
    numeric: true,
    disablePadding: true,
    label: "Cash limit"
  },
  {
    id: "orderCount",
    numeric: true,
    disablePadding: true,
    label: "Order count"
  },
  {
    id: "createdTime",
    numeric: false,
    disablePadding: true,
    label: "Created time"
  },
  {
    id: "expiryTime",
    numeric: false,
    disablePadding: true,
    label: "Expiry time"
  }
];

const DiscountByCash = ({ discounts }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDiscount] = useMutation(DELETE_DISCOUNTS_MUTATION);
  const handleDelete = (selected) => {
    if (selected === []) return;
    setIsLoading(true);
    try {
      selected.forEach((item) => {
        deleteDiscount({
          variables: { discountID: parseInt(item) },
          refetchQueries: [{ query: LOAD_DISCOUNTS }]
        });
      });
      enqueueSnackbar("Delete item(s) successfully", AlertSuccessProp);
    } catch (e) {
      enqueueSnackbar("An error occured", AlertErrorProp);
    } finally {
      setIsLoading(false);
    }
  };
  // if(error) return <Redirect to="/login"/>;

  return (
    <Box>
      <BudaTable
        deleteItems={handleDelete}
        data={discounts}
        headCells={headCells}
        Modal={AddDiscountModal}
        type="discountID"
        DetailTableBody={DiscountByCashTableBody}
      />
    </Box>
  );
};

export default DiscountByCash;
