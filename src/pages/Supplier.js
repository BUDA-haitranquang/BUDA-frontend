import { useMutation, useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AddSupplierModal from "../components/modal/AddSupplierModal";
import SupplierTableBody from "../components/table/body/SupplierTableBody";
// import SupplierTable from "../buda-components/table/SupplierTable";
import BudaTable from "../buda-components/table/BudaTable";
import { LOAD_SUPPLIERS } from "../graphQl/suppliers/suppliersQueries";
import { HIDE_SUPPLIER_MUTATION } from "../graphQl/suppliers/suppliersMutations";
import { useSnackbar } from "notistack";
import { AlertErrorProp, AlertSuccessProp } from "../buda-components/alert/BudaNoti";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name"
  },
  {
    id: "phoneNumber",
    numeric: false,
    disablePadding: false,
    label: "Phone Number"
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address"
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email"
  }
];

const Supplier = (props) => {
  const { window } = props;
  const [supplier, setSupplier] = useState([]);
  const { error, loading, data } = useQuery(LOAD_SUPPLIERS);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [hideSupplier] = useMutation(HIDE_SUPPLIER_MUTATION);
  const handleDelete = (selected) => {
    if (selected === []) return;
    setIsLoading(true);
    try {
      selected.forEach((item) => {
        hideSupplier({
          variables: { supplierID: parseInt(item) },
          refetchQueries: [{ query: LOAD_SUPPLIERS }]
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
      if (data) setSupplier(data.suppliersByUser.map(item => item));
    }

    fetchData();
    console.log(data);
  }, [data]);

  if (error) return <Redirect to="/login" />;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Supplier" id="supplier"/>
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
            data={supplier.reverse()}
            headCells={headCells}
            Modal={AddSupplierModal}
            type="supplierID"
            DetailTableBody={SupplierTableBody}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Supplier;