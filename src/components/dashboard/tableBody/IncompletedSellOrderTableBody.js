import { TableCell, IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { dateToDateString } from "../../../utils/utils";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@apollo/client";
import {
  FINISH_SELL_ORDER,
  CANCEL_SELL_ORDER,
} from "../../../graphQl/dashboard/mutation";
import { INCOMPLETED_SELL_ORDER } from "../../../graphQl/dashboard/queries";
const IncompletedSellOrderTableBody = (props) => {
  const { row, labelId } = props;
  return (
    <>
      <TableCell component="th" id={labelId} scope="row">
        <Link
          to={{ pathname: `/business/sell/${row.sellOrderID}` }}
          style={{ textDecoration: "none", color: "blue" }}
        >
          {row.textID}
        </Link>
      </TableCell>
      <TableCell align="left">{row.customerName}</TableCell>
      <TableCell align="left">{dateToDateString(row.creationTime)}</TableCell>
      <TableCell align="right">{row.finalCost}</TableCell>

      <TableCell align="left">{row.status}</TableCell>
      <TableCell align="left">
        <FinishOrder id={row.sellOrderID} />
      </TableCell>
      <TableCell align="left">
        <CancelOrder id={row.sellOrderID} />
      </TableCell>
    </>
  );
};

export default IncompletedSellOrderTableBody;

const FinishOrder = ({ id }) => {
  const [finishSellOrder] = useMutation(FINISH_SELL_ORDER);
  const hanldeFinish = async (id) => {
    finishSellOrder({
      variables: { sellOrderID: parseInt(id) },
      refetchQueries: [{ query: INCOMPLETED_SELL_ORDER }],
    });
  };
  return (
    <>
      <IconButton
        onClick={(e) => {
          hanldeFinish(id);
        }}
      >
        <CheckIcon sx={{ "&:hover": { color: "green" } }} />
      </IconButton>
    </>
  );
};

const CancelOrder = ({ id }) => {
  const [cancelSellOrder] = useMutation(CANCEL_SELL_ORDER);
  const hanldeCancel = async (id) => {
    cancelSellOrder({
      variables: { sellOrderID: parseInt(id) },
      refetchQueries: [{ query: INCOMPLETED_SELL_ORDER }],
    });
  };
  return (
    <>
      <IconButton
        onClick={(e) => {
          hanldeCancel(id);
        }}
      >
        <CloseIcon sx={{ "&:hover": { color: "red" } }} />
      </IconButton>
    </>
  );
};
