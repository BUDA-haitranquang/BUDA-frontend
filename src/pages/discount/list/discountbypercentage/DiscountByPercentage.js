import AddDiscountModal from "../../../../components/modal/AddDiscountModals";
import Box from "@mui/material/Box";
import { useState } from "react";
import DiscountByPercentageTableBody from "./components/DiscountByPercentageTableBody";
import BudaTable from "../../../../buda-components/table/BudaTable";
import { useSnackbar } from "notistack";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../../../buda-components/alert/BudaNoti";
import { useMutation } from "@apollo/client";
import { DELETE_DISCOUNTS_MUTATION } from "../../../../graphQl/discounts/discountMutations";
import { LOAD_DISCOUNTS } from "../../../../graphQl/discounts/discountQueries";
import { useTranslation } from "react-i18next";

const DiscountByPercentage = ({ discounts }) => {
  const { t } = useTranslation(["discount"]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDiscount] = useMutation(DELETE_DISCOUNTS_MUTATION);

  const headCells = [
    {
      id: "discountCode",
      numeric: false,
      disablePadding: false,
      label: t("discount:list.code"),
    },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: t("discount:list.name"),
    },
    {
      id: "percentage",
      numeric: true,
      disablePadding: true,
      label: t("discount:list.percentage"),
    },
    {
      id: "cashLimit",
      numeric: true,
      disablePadding: true,
      label: t("discount:list.cashLimit"),
    },
    {
      id: "orderCount",
      numeric: true,
      disablePadding: true,
      label: t("discount:list.orderCount"),
    },
    {
      id: "createdTime",
      numeric: false,
      disablePadding: true,
      label: t("discount:list.createdAt"),
    },
    {
      id: "expiryTime",
      numeric: false,
      disablePadding: true,
      label: t("discount:list.finishedAt"),
    },
  ];

  const handleDelete = (selected) => {
    if (selected === []) return;
    setIsLoading(true);
    try {
      selected.forEach((item) => {
        deleteDiscount({
          variables: { discountID: parseInt(item) },
          refetchQueries: [{ query: LOAD_DISCOUNTS }],
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
        DetailTableBody={DiscountByPercentageTableBody}
      />
    </Box>
  );
};

export default DiscountByPercentage;
