import { useMutation, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../buda-components/alert/BudaNoti";
import BudaTable from "../buda-components/table/BudaTable";
import AddFixedCostModal from "../components/modal/AddFixedCostModal";
import FixedCostTableBody from "../components/table/body/FixedCostTableBody";
import { HIDE_FIXED_COST_MUTATION } from "../graphQl/cost/fixedCost/fixedCostMutation";
import { LOAD_FIXED_COST } from "../graphQl/cost/fixedCost/fixedCostQueries";

const FixCost = () => {
  const [fixcosts, setFixCosts] = useState([]);
  const { data } = useQuery(LOAD_FIXED_COST);
  const { enqueueSnackbar } = useSnackbar();
  const [hideFixedCost] = useMutation(HIDE_FIXED_COST_MUTATION);
  const { t } = useTranslation(["common", "cost"]);
  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: t("cost:Name"),
    },
    {
      id: "description",
      numeric: false,
      disablePadding: false,
      label: t("common:Description"),
    },
    {
      id: "period",
      numeric: true,
      disablePadding: false,
      label: t("cost:Period"),
    },
    {
      id: "moneyamount",
      numeric: true,
      disablePadding: false,
      label: t("cost:moneyAmount"),
    },
  ];
  const handleDelete = (selected) => {
    if (selected === []) return;
    try {
      selected.forEach((item) => {
        hideFixedCost({
          variables: { fixedCostID: parseInt(item) },
          refetchQueries: [{ query: LOAD_FIXED_COST }],
        });
      });
      enqueueSnackbar("Delete item(s) successfully", AlertSuccessProp);
    } catch (e) {
      enqueueSnackbar("An error occured", AlertErrorProp);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (data) setFixCosts(data.fixedCostsByUser.map((item) => item));
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
          data={fixcosts}
          headCells={headCells}
          Modal={AddFixedCostModal}
          type="fixedCostID"
          DetailTableBody={FixedCostTableBody}
        />
      </Box>
    </Box>
  );
};

export default FixCost;
