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
import AddOtherCostModal from "../components/modal/AddOtherCostModal";
import OtherCostTableBody from "../components/table/body/OtherCostTableBody";
import { HIDE_OTHER_COST } from "../graphQl/cost/otherCost/otherCostMutation";
import { LOAD_OTHER_COST } from "../graphQl/cost/otherCost/otherCostQueries";

const OtherCost = () => {
  const [fixcosts, setFixCosts] = useState([]);
  const { data } = useQuery(LOAD_OTHER_COST);
  const { enqueueSnackbar } = useSnackbar();
  const [hideOtherCost] = useMutation(HIDE_OTHER_COST);
  const { t } = useTranslation(["common", "cost"]);
  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: t("cost:Name"),
    },
    {
      id: "totalCost",
      numeric: true,
      disablePadding: false,
      label: t("cost:totalCost"),
    },
    {
      id: "creationTime",
      numeric: false,
      disablePadding: false,
      label: t("cost:creationTime"),
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: t("cost:Status"),
    },
    {
      id: "description",
      numeric: false,
      disablePadding: false,
      label: t("common:Description"),
    },
  ];
  const handleDelete = (selected) => {
    if (selected === []) return;
    try {
      selected.forEach((item) => {
        hideOtherCost({
          variables: { fixedCostID: parseInt(item) },
          refetchQueries: [{ query: LOAD_OTHER_COST }],
        });
      });
      enqueueSnackbar("Delete item(s) successfully", AlertSuccessProp);
    } catch (e) {
      enqueueSnackbar("An error occurred", AlertErrorProp);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (data) setFixCosts(data.otherCostsByUser.map((item) => item));
    }

    fetchData();
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
          Modal={AddOtherCostModal}
          type="otherCostID"
          DetailTableBody={OtherCostTableBody}
        />
      </Box>
    </Box>
  );
};

export default OtherCost;
