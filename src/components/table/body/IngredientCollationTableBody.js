import { TableCell, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import IngredientCollationModal from "../../../pages/collation/IngredientCollationModal";
import { makeStyles } from "@mui/styles";
const useStyle = makeStyles({
  button: {
    "&.MuiButton-root": { textTransform: "none" },
  },
});

const IngredientCollationTableBody = (props) => {
  const classes = useStyle();
  const { row, labelId } = props;
  const [ totalAmount, setTotalAmount] = React.useState(row.amountLeft);
  const [ open, setOpen] = React.useState(false);
  const [ descrip,setDescrip ] = React.useState(row.description);
  const changeOpen = () => {
    setOpen(true);
  };
  const changeClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableCell component="th" id={labelId} scope="row">
        <Link
          to={{ pathname: `${row.ingredientID}` }}
          style={{ textDecoration: "none", color: "blue" }}
        >
          {row.ingredientSKU}
        </Link>
      </TableCell>

      <TableCell align="left" sx={{ maxWidth: "150px" }}>
        {row.name}
      </TableCell>
      <TableCell align="left" sx={{ maxWidth: "100px" }}>
        {descrip}
      </TableCell>
      <TableCell align="right">{totalAmount}</TableCell>
      <TableCell align="right">
        <Button
          onClick={changeOpen}
          className={classes.button}
          variant="outlined"
        >
          {" "}
          Edit
        </Button>
      </TableCell>

      <IngredientCollationModal
        title={row.name}
        isOpen={open}
        handleClose={changeClose}
        ingredientID={row.ingredientID}
        amountChange={(val) => {
          setTotalAmount(val);
        }}
        desChange={(val) => {
          setDescrip(val);
        }}
      />
    </>
  );
};

export default IngredientCollationTableBody;
