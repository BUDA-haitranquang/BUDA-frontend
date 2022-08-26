import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { dateToDateString } from "../../../utils/utils";
import { useMutation } from "@apollo/client";
import { INCOMPLETED_BUY_ORDER } from "../../../graphQl/dashboard/queries";
import { UPDATE_BUY_ORDER_STATUS } from "../../../graphQl/dashboard/mutation";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../../../buda-components/alert/BudaNoti";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { TableCell, IconButton } from "@mui/material";
const IncompletedBuyOrderTableBody = (props) => {
  const { row, labelId } = props;
  return (
    <>
      {/* <TableCell align="right">{row.id}</TableCell> */}
      <TableCell component="th" id={labelId} scope="row">
        <Link
          to={{ pathname: `/business/buy/${row.buyOrderID}` }}
          style={{ textDecoration: "none", color: "blue" }}
        >
          {row.textID}
        </Link>
      </TableCell>
      <TableCell align="left">{row.supplierName}</TableCell>
      <TableCell align="left">{dateToDateString(row.creationTime)}</TableCell>
      <TableCell align="right">{row.totalCost}</TableCell>
      <TableCell align="left">{row.status}</TableCell>
      <TableCell align="left">
        <UpdateStatus id={row.buyOrderID} status="FINISHED" />
      </TableCell>
      <TableCell align="left">
        <UpdateStatus id={row.buyOrderID} status="CANCELLED" />
      </TableCell>
    </>
  );
};

export default IncompletedBuyOrderTableBody;

const UpdateStatus = ({ id, status }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateBuyOrder] = useMutation(UPDATE_BUY_ORDER_STATUS);
  const hanldeUpdate = async (id, status) => {
    await updateBuyOrder({
      variables: { buyOrderID: parseInt(id), status: status },
      refetchQueries: [{ query: INCOMPLETED_BUY_ORDER }],
    });
  };
  return (
    <>
      <IconButton
        onClick={(e) => {
          try {
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
