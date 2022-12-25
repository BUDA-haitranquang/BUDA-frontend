import { useMutation, useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../buda-components/alert/BudaNoti";
import BudaTable from "../buda-components/table/BudaTable";
import AddSupplierModal from "../components/modal/AddSupplierModal";
import SupplierTableBody from "../components/table/body/SupplierTableBody";
import { HIDE_SUPPLIER_MUTATION } from "../graphQl/suppliers/suppliersMutations";
import { LOAD_SUPPLIERS } from "../graphQl/suppliers/suppliersQueries";

const Supplier = (props) => {
  const [supplier, setSupplier] = useState([]);
  const { data } = useQuery(LOAD_SUPPLIERS);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [hideSupplier] = useMutation(HIDE_SUPPLIER_MUTATION);
  const { t } = useTranslation(["common", "supplier"]);
  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: t("supplier:Name"),
    },
    {
      id: "phoneNumber",
      numeric: false,
      disablePadding: false,
      label: t("common:PhoneNumber"),
    },
    {
      id: "address",
      numeric: false,
      disablePadding: false,
      label: t("common:Address"),
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: t("common:Email"),
    },
  ];
  const handleDelete = (selected) => {
    if (selected === []) return;
    setIsLoading(true);
    try {
      selected.forEach((item) => {
        hideSupplier({
          variables: { supplierID: parseInt(item) },
          refetchQueries: [{ query: LOAD_SUPPLIERS }],
        });
      });
      enqueueSnackbar("Delete item(s) successfully", AlertSuccessProp);
    } catch (e) {
      enqueueSnackbar("An error occurred", AlertErrorProp);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (data) setSupplier(data.suppliersByUser.map((item) => item));
    }

    fetchData();
    console.log(data);
  }, [data]);

  // if (error) return <Redirect to="/login" />;

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <BudaTable
          deleteItems={handleDelete}
          data={supplier}
          headCells={headCells}
          Modal={AddSupplierModal}
          type="supplierID"
          DetailTableBody={SupplierTableBody}
        />
      </Box>
    </Box>
  );
};

export default Supplier;
