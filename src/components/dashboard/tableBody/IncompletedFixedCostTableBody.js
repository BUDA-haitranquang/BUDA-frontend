import React from "react";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../../buda-components/alert/BudaNoti";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { TableCell, IconButton} from "@mui/material";
import { dateToDateString } from "../../../utils/utils";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { INCOMPLETED_FIXED_COST } from "../../../graphQl/dashboard/queries";
import { UPDATE_FIXED_COST_STATUS } from "../../../graphQl/dashboard/mutation";
const IncompletedFixedCostTableBody = (props) => {
  const { row, labelId } = props;
  return (
    <>
      {/* <TableCell align="right">{row.id}</TableCell> */}
      <TableCell component="th" id={labelId} scope="row">
        {/* <Link
          to={{ pathname: `/business/buy/${row.buyOrderID}` }}
          style={{ textDecoration: "none", color: "blue" }}
        > */}
        {row.fixedCostBillID}
        {/* </Link> */}
      </TableCell>

      <TableCell align="left">{dateToDateString(row.creationTime)}</TableCell>
      <TableCell align="left">{dateToDateString(row.dueTime)}</TableCell>
      <TableCell align="right">{row.totalSpend}</TableCell>
      <TableCell align="left">{row.status}</TableCell>
      <TableCell align="left">
        <UpdateStatus id={row.fixedCostBillID} status="FINISHED" />
      </TableCell>
      <TableCell align="left">
        <UpdateStatus id={row.fixedCostBillID} status="CANCELLED" />
      </TableCell>
    </>
  );
};

export default IncompletedFixedCostTableBody;


const UpdateStatus = ({ id, status }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateBuyOrder] = useMutation(UPDATE_FIXED_COST_STATUS);
  const hanldeUpdate = async (id, status) => {
    await updateBuyOrder({
      variables: { fixedCostBillID: parseInt(id), status: status },
      refetchQueries: [{ query: INCOMPLETED_FIXED_COST }],
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

