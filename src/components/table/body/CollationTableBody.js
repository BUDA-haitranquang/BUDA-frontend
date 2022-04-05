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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: "20px",
    align: "center",
  };
  const inputStyle = {
    align: "center",
  };
  console.log(open);

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
      <TableCell align="right">{row.amountLeft }</TableCell>
      <TableCell align="center">
        <Button variant = 'outlined' onClick={changeOpen}> Note</Button>
      </TableCell>
      <CollationModal title = {row.name} isOpen={open} handleClose={changeClose} />
    </>
  );
};

export default CollationTableBody;
