import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import CombinedTable from "../components/CombinedTable";
import { Toolbar } from "@mui/material";
import { fetchData } from "../redux/customerSlice";
import AddCustomerModal from "../components/modal/AddCustomerModal";

const headCells = [
  {
    id: "ID",
    numeric: true,
    disablePadding: false,
    label: "#",
  },
  {
    id: "fullname",
    numeric: false,
    disablePadding: true,
    label: "Fullname",
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
];

const Products = (props) => {
  const { window } = props;
  const customers = useSelector((state) => state.customer.customers);
  const dp = useDispatch();
  useEffect(() => {
    dp(fetchData());
    console.log(customers);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Customer" />

      <Box
        mt={5}
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Toolbar />
        <Box>{}</Box>
        <Box width="80%">
          <CombinedTable data={customers} headCells={headCells} Modal={AddCustomerModal}/>
        </Box>
      </Box>
    </Box>
  );
};
export default Products;
