import { TableCell, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

import CollationModal from "../../modal/CollationModal";
import {makeStyles} from '@mui/styles';
const useStyle = makeStyles({
  button: {
    '&.MuiButton-root':{textTransform : 'none'}
  }
})

const CollationTableBody = (props) => {
  const classes = useStyle()
  const { row, labelId } = props;
  const [open, setOpen] = React.useState(false);

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
          to={{ pathname: `${row.productID}` }}
          style={{ textDecoration: "none", color: "blue" }}
        >
          {row.productSKU}
        </Link>
      </TableCell>

      <TableCell align="left" sx={{ maxWidth: "100px" }}>
        {row.name}
      </TableCell>
      <TableCell align="right">{row.amountLeft}</TableCell>
      <TableCell align="right">
        <Button onClick={changeOpen} className = {classes.button} variant = 'outlined'> Edit</Button>
      </TableCell>

      <CollationModal
        title={row.name}
        isOpen={open}
        handleClose={changeClose}
        productID = {row.productID}
        data = {row}
      />
    </>
  );
};

export default CollationTableBody;
