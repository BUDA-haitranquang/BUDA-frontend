import { useMutation, useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BudaTable from "../../buda-components/table/BudaTable";
import { INCOMPLETED_FIXED_COST } from "../../graphQl/dashboard/queries";
import IncompletedFixedCostTableBody from './tableBody/IncompletedFixedCostTableBody'
// import { HIDE_PRODUCT_MUTATION } from "../graphQl/products/productMutations";


const IncompletedFixedCost = (props) => {
//   const { t } = useTranslation(["common", "product"]);
  const [fixedCost, setFixedCost] = useState([]);
  const { error, loading, data } = useQuery(INCOMPLETED_FIXED_COST);
console.log(data)
  const toObject = (data1)=>{
      let incompleted = {};
      incompleted.fixedCostBillID = data1?.fixCostBillID;
      incompleted.dueTime = data1?.dueTime;
      incompleted.totalSpend = data1?.totalSpend;
      incompleted.creationTime = data1?.creationTime;
      incompleted.status = data1?.status;
      return incompleted;
  }  

  useEffect(() => {
    async function fetchData() {    
      if (data) {   
          setFixedCost(data.incompletedFixedCostBillsByUser.map((item) => toObject(item)));
      }
    }
    fetchData();
  }, [data]);
  
  // if(error) return <Redirect to="/login"/>;
  const headCells = [
    {
      id: "fixedCostBillID",
      numeric: false,
      disablePadding: false,
      label:'ID'
    },
   
    {
      id: "creationTime",
      numeric: false,
      disablePadding: true,
      label: "Creation Time"
    },
    {
        id: "dueTime",
        numeric: false,
        disablePadding: false,
        label: 'Due Time'
      },
    {
      id: "totalSpend",
      numeric: true,
      disablePadding: true,
      label: "Money Amount"
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "Status"
    },
  ];
console.log(fixedCost)
  return (
    <Box sx={{ display: "flex" }}>
        <Box>
          <BudaTable
            data={fixedCost.reverse()}
            headCells={headCells}
            isNotShowCheckBox={true}
            type="fixedCostBillID"
            DetailTableBody={IncompletedFixedCostTableBody}
          />
      </Box>
    </Box>
  );
};

export default IncompletedFixedCost;
