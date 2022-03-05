import { useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import CombinedTable from "../../components/CombinedTable";
import AddDiscountPercentageModal from "../../components/modal/AddDiscountPercentageModal";
import Sidebar from "../../components/Sidebar";
import DiscountTableBody from '../table/body/DiscountByPercentageTableBody'
import { LOAD_DISCOUNTS } from "../../graphQl/discounts/discountsQueries";
const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "percentage",
    numeric: true,
    disablePadding: true,
    label: "Percentage",
  },
  {
    id: "cashLimit",
    numeric: true,
    disablePadding: true,
    label: "Cash limit",
  },
  {
    id: "orderCount",
    numeric: true,
    disablePadding: true,
    label: "Order count",
  },
  {
    id: "createdTime",
    numeric: false,
    disablePadding: true,
    label: "Created time",
  },
  {
    id: "expiryTime",
    numeric: false,
    disablePadding: true,
    label: "Expiry time",
  },
];

const DiscountByPercentage = (props) => {
  const { window } = props;
  const [discounts, setDiscounts] = useState([]);
  const { error, loading, data} = useQuery(LOAD_DISCOUNTS);
  //const [hideProduct] = useMutation(HIDE_PRODUCT_MUTATION);

  
  const handleDelete = (selected) =>{
      return;
  }

  useEffect(() => {
    async function fetchData(){
      if(data) setDiscounts(data.discountsByUser);
      console.log(data);
    }
    
    fetchData();
  }, [data]); 

  return (
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
          <Box px ={3}></Box>
          <CombinedTable
            deleteItems={handleDelete}
            data={discounts}
            headCells={headCells}
            Modal={AddDiscountPercentageModal}
            Body={DiscountTableBody}
            type='discountID'
          />
          <Box px ={3}></Box>
        </Box>  
    );
};
export default DiscountByPercentage;
