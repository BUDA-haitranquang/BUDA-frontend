import { TableCell, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { display, flexbox } from "@mui/system";
import { CenterFocusStrong } from "@mui/icons-material";
import CollationModal from "../../modal/CollationModal";
const CollationTableBody = (props) => {
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
          {row.name}
        </Link>
      </TableCell>

      <TableCell align="right">{row.amountLeft}</TableCell>
      <TableCell align="right">{row.amountLeft}</TableCell>
      <TableCell align="center">
        <Button onClick={changeOpen}> Note</Button>
      </TableCell>

      <CollationModal title={row.name} isOpen={open} handleClose={changeClose} />
    </>
  );
};

export default CollationTableBody;
