import React from "react";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../../buda-components/alert/BudaNoti";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { TableCell, IconButton } from "@mui/material";
import { dateToDateString } from "../../../utils/utils";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { INCOMPLETED_OTHER_COST } from "../../../graphQl/dashboard/queries";
import { UPDATE_OTHER_COST_STATUS } from "../../../graphQl/dashboard/mutation";
const IncompletedFixedCostTableBody = (props) => {
  const { row, labelId } = props;
  return (
    <>
      <TableCell component="th" id={labelId} scope="row">
        {/* <Link
          to={{ pathname: `/business/buy/${row.buyOrderID}` }}
          style={{ textDecoration: "none", color: "blue" }}
        > */}
        {row.name}
        {/* </Link> */}
      </TableCell>
      <TableCell align="left">{dateToDateString(row.creationTime)}</TableCell>
      <TableCell align="right">{row.totalCost}</TableCell>
      <TableCell align="left">{row.status}</TableCell>
      <TableCell align="left">
        <UpdateStatus id={row.otherCostID} status="FINISHED" />
      </TableCell>
      <TableCell align="left">
        <UpdateStatus id={row.otherCostID} status="CANCELLED" />
      </TableCell>
    </>
  );
};

export default IncompletedFixedCostTableBody;

const UpdateStatus = ({ id, status }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateBuyOrder] = useMutation(UPDATE_OTHER_COST_STATUS);
  const hanldeUpdate = async (id, status) => {
    await updateBuyOrder({
      variables: { otherCostID: parseInt(id), status: status },
      refetchQueries: [{ query: INCOMPLETED_OTHER_COST }],
    });
  };
  return (
    <>
      <IconButton
        onClick={(e) => {
          try {
            console.log(id,status);
            hanldeUpdate(id, status);
            enqueueSnackbar(
              status === "FINISHED" ? "Order finish" : "Order cancel",
              AlertSuccessProp
            );
          } catch (e) {
            enqueueSnackbar("An error occured", AlertErrorProp);
          }
        }}
      >
        {status === "FINISHED" ? (
          <CheckIcon sx={{ "&:hover": { color: "green" } }} />
        ) : (
          <CloseIcon sx={{ "&:hover": { color: "red" } }} />
        )}
      </IconButton>
    </>
  );
};

