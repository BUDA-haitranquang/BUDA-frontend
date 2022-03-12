import { TableCell } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const IngredientTableBody = (props) => {
  const { row, labelId } = props;
  return (
    <>
      {/* <TableCell align="right">{row.id}</TableCell> */}
      <TableCell component="th" id={labelId} scope="row">
        <Link
          to={{
            pathname: `ingredient/${row.ingredientID}`,
            // state: { data: row },
          }}
          style={{ textDecoration: "none", color: "blue" }}
        >
          {row.name}
        </Link>
      </TableCell>

      <TableCell align="right">{row.price}</TableCell>
      <TableCell align="right">{row.amountLeft}</TableCell>
      <TableCell align="right">{row.alertAmountLeft}</TableCell>
    
      <TableCell align="left">{row.description}</TableCell>
    </>
  );
};

export default IngredientTableBody;
