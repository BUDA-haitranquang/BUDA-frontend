import { TableCell } from "@mui/material";
import { Link } from "react-router-dom";
import color from "src/theme/color";
const IngredientTableBody = (props) => {
  const { row, labelId } = props;
  return (
    <>
      {/* <TableCell align="right">{row.id}</TableCell> */}
      <TableCell component="th" id={labelId} scope="row">
        <Link
          to={{
            pathname: `${row.ingredientID}`,
            // state: { data: row },
          }}
          style={{ textDecoration: "none", color: color.PRIMARY }}
        >
          {row.sku}
        </Link>
      </TableCell>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="right">{row.price}</TableCell>
      <TableCell align="right">{row.amountLeft}</TableCell>
      <TableCell align="right">{row.alertAmountLeft}</TableCell>

      <TableCell align="left">{row.description}</TableCell>
    </>
  );
};

export default IngredientTableBody;
