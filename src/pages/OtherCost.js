import { useMutation, useQuery } from "@apollo/client";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import AddOtherCostModal from "../components/modal/AddOtherCostModal";
import Sidebar from "../components/Sidebar";
import { LOAD_OTHER_COST } from "../graphQl/cost/otherCost/otherCostQueries";
import { HIDE_OTHER_COST } from "../graphQl/cost/otherCost/otherCostMutation";
import OtherCostTableBody from "../components/table/body/OtherCostTableBody";
import { useSnackbar } from "notistack";
import { AlertErrorProp, AlertSuccessProp } from "../buda-components/alert/BudaNoti";
import BudaTable from "../buda-components/table/BudaTable";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name"
  },
  {
    id: "totalCost",
    numeric: true,
    disablePadding: false,
    label: "Total Cost"
  },
  {
    id: "creationTime",
    numeric: false,
    disablePadding: false,
    label: "Creation Time"
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status"
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description"
  }
];

const OtherCost = (props) => {
  const { window } = props;
  const [fixcosts, setFixCosts] = useState([]);
  const { error, loading, data } = useQuery(LOAD_OTHER_COST);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [hideOtherCost] = useMutation(HIDE_OTHER_COST);
  const handleDelete = (selected) => {
    if (selected === []) return;
    setIsLoading(true);
    try {
      selected.forEach((item) => {
        hideOtherCost({
          variables: { fixedCostID: parseInt(item) },
          refetchQueries: [{ query: LOAD_OTHER_COST }]
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
      if (data) setFixCosts(data.otherCostsByUser.map(item => item));
    }

    fetchData();
    console.log(data);
  }, [data]);

  if (error) return <Redirect to="/login" />;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Other Cost" />
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
            data={fixcosts.reverse()}
            headCells={headCells}
            Modal={AddOtherCostModal}
            type="otherCostID"
            DetailTableBody={OtherCostTableBody}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OtherCost;