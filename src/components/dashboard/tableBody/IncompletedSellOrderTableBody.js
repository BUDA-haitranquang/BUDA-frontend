import { TableCell, IconButton } from "@mui/material";
import React, { useState } from "react";
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
import BudaModal from "../../../buda-components/modal/BudaModal";
import { useSnackbar } from "notistack";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../../buda-components/alert/BudaNoti";
import { Box, Typography } from "@mui/material";
import color from "src/theme/color";

const IncompletedSellOrderTableBody = (props) => {
  const { row, labelId } = props;
  return (
    <>
      <TableCell component="th" id={labelId} scope="row">
        <Link
          to={{ pathname: `/business/sell/${row.sellOrderID}` }}
          style={{ textDecoration: "none", color: color.PRIMARY }}
        >
          <Typography>{row.textID}</Typography>
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
  const { enqueueSnackbar } = useSnackbar();
  const [finishSellOrder] = useMutation(FINISH_SELL_ORDER);
  const hanldeFinish = async (id) => {
    await finishSellOrder({
      variables: { sellOrderID: parseInt(id) },
      refetchQueries: [{ query: INCOMPLETED_SELL_ORDER }],
    });
  };
  return (
    <>
      <IconButton
        onClick={(e) => {
          try {
            hanldeFinish(id);
            enqueueSnackbar("Order finish", AlertSuccessProp);
          } catch (e) {
            enqueueSnackbar("An error occured", AlertErrorProp);
          }
        }}
      >
        <CheckIcon sx={{ "&:hover": { color: "green" } }} />
      </IconButton>
    </>
  );
};

const CancelOrder = ({ id }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [cancelSellOrder] = useMutation(CANCEL_SELL_ORDER);
  const [open, setOpen] = useState(false);
  const handleCancel = async (id) => {
    try {
      await cancelSellOrder({
        variables: { sellOrderID: parseInt(id) },
        refetchQueries: [{ query: INCOMPLETED_SELL_ORDER }],
      });
      enqueueSnackbar("Order cancel successfully", AlertSuccessProp);
    } catch (e) {
      enqueueSnackbar("An error occured", AlertErrorProp);
    } finally {
      setOpen(false);
    }
  };
  return (
    <>
      <IconButton
        onClick={(e) => {
          setOpen(true);
        }}
      >
        <CloseIcon sx={{ "&:hover": { color: "red" } }} />
      </IconButton>
      <BudaModal
        open={open}
        onClose={(e) => setOpen(false)}
        textOk="Yes"
        onOk={(e) => {
          handleCancel(id);
        }}
        textClose="No"
        children={
          <Box
            sx={{
              height: "100px",
              width: "400px ",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1> Are you sure? </h1>
          </Box>
        }
      ></BudaModal>
    </>
  );
};
