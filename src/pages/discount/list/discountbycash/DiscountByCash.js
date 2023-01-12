import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../../../buda-components/alert/BudaNoti";
import BudaTable from "../../../../buda-components/table/BudaTable";
import AddDiscountModal from "../../../../components/modal/AddDiscountModals";
import { DELETE_DISCOUNTS_MUTATION } from "../../../../graphQl/discounts/discountMutations";
import { LOAD_DISCOUNTS } from "../../../../graphQl/discounts/discountQueries";
import DiscountByCashTableBody from "./components/DiscountByCashTableBody";

const DiscountByCash = ({ discounts }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
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
      id: "cash",
      numeric: true,
      disablePadding: true,
      label: t("discount:list.cash"),
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
    }
  };

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
