import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import CombinedTable from "../components/CombinedTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/supplierSlice";
import AddSupplierModal from '../components/modal/AddSupplierModal';
import SupplierTableBody from "../components/table/body/SupplierTableBody"; 
const headCells = [
  // {
  //   id: "ID",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "#",
  // },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: true,
    label: "Phone",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: true,
    label: "Address",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
];

const Supplier = (props) => {
  const { window } = props;
  const  supplier =[];
  //const supplier = useSelector((state) => state.product.products);
  const dp = useDispatch();
  // useEffect(() => {
  //   dp(fetchData());
  // }, []);
  return (
    <Box sx={{display: "flex"}}>
      <Sidebar window={window} name="Supplier" />
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
          <CombinedTable data={supplier} headCells={headCells} Modal={AddSupplierModal} Body={SupplierTableBody}/>
        </Box>
      </Box>
    </Box>
  );
};
export default Supplier;
