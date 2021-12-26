import React, { useEffect,useState } from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import CombinedTable from "../components/CombinedTable";
import AddSupplierModal from '../components/modal/AddSupplierModal';
import { useQuery } from "@apollo/client";
import { LOAD_SUPPLIERS } from "../graphQl/suppliers/suppliersQueries";
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
    id: "phoneNumber",
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
  const  [suppliers,setSuppliers] = useState([]);
  const {error,loading,data} = useQuery(LOAD_SUPPLIERS);

  useEffect(()=>{
    async function fetchData(){
      if(data) setSuppliers(data.suppliersByUser);
    }
    fetchData();
    console.log(suppliers);
    },[data]);
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
          <CombinedTable 
            type = 'supplierID'
            data={suppliers} 
            headCells={headCells}   
            Modal={AddSupplierModal} 
            Body={SupplierTableBody}/>
        </Box>
      </Box>
    </Box>
  );
};
export default Supplier;
