import { TableCell } from "@mui/material";
import { dateToDateString } from "../../../utils/utils";
const FixedCostBillTableBody = (props) => {
    const { row,labelId } = props;
    return (
       <>
        <TableCell component="th" id={labelId} scope="row">
            {row.message}
        </TableCell>
        <TableCell align="left">{dateToDateString(row.dueTime)}</TableCell>
        <TableCell align="left">{dateToDateString(row.creationTime)}</TableCell>
        <TableCell align="left">{row.totalSpend}</TableCell>
   </>     
    );
};

export default FixedCostBillTableBody;