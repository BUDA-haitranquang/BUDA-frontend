import { TableCell } from "@mui/material";
import { Link } from "react-router-dom";
import { dateToDateString } from "../../../utils/utils";
import color from "src/theme/color";

const SellOrderTableBody = (props) => {
  const { row, labelId } = props;

  return (
    <>
      <TableCell component="th" id={labelId} scope="row">
        <Link
          to={{ pathname: `sell/${row.id}` }}
          style={{ textDecoration: "none", color: color.PRIMARY }}
        >
          {row.sellOrderID}
        </Link>
      </TableCell>

      <TableCell align="left">{row.customerName}</TableCell>
      <TableCell align="right">{row.finalCost}</TableCell>
      <TableCell align="right">{dateToDateString(row.creationTime)}</TableCell>
      <TableCell align="right">{dateToDateString(row.finishTime)}</TableCell>
      <TableCell align="left">{row.status}</TableCell>
    </>
  );
};

export default SellOrderTableBody;
