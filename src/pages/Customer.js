import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import CombinedTable from "../components/CombinedTable";
import { Toolbar } from "@mui/material";
import { fetchData } from "../redux/customerSlice";
import AddCustomerModal from "../components/modal/AddCustomerModal";
import CustomerTableBody from '../components/table/body/CustomerTableBody';
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

const Customer = (props) => {
  const { window } = props;
  const customers = [
    {
      name:'hanh',
      phone:'3490239',
      address:'daoisda',
      email:'asdhas',
    }
  ];
  // const customers = useSelector((state) => state.customer.customers);
  // const dp = useDispatch();
  // useEffect(() => {
  //   dp(fetchData());
  //   console.log(customers);
  // }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Customer" />

      <Box
        //mt={5}
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent = 'center'
      >
        <Toolbar />
        <Box>{}</Box>
        <Box >
          <CombinedTable data={customers} headCells={headCells} Modal={AddCustomerModal} Body={CustomerTableBody}/>
        </Box>
      </Box>
    </Box>
  );
};
export default Customer;
