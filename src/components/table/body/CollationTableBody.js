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
  const [value, setValue] = React.useState(0);
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
      <TableCell align="right">{row.amountLeft - value}</TableCell>

      <TableCell align="center">
        <TextField
          sx={{
            width: 100,
          }}
          size="small"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setValue(e.target.value)}
        />
      </TableCell>
      <TableCell align="center">
        <Button onClick={changeOpen}> Details</Button>
      </TableCell>

      {/* <Modal
                        open = {open}
                        onClose={changeClose}
                    >
                       <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Title
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <p>Noi dung : Khong biet ghi gi</p>
                                <p>Noi dung 2 : Khong biet ghi gi 2</p>
                            </Typography>
                            <Button sx = {{width : 336 , height : 30,pt : 2}} onClick={changeClose}>Close</Button>
                            <div style = {{
                                display : 'flex',
                                justifyContent : 'center'
                            }}
                            >
                              <input type ="text" placeholder="placee holder" align="center"/>
                              <button type='submit' width={100}>addd</button>
                            </div>
                           
                        </Box>
                    </Modal> */}
      <CollationModal isOpen={open} handleClose={changeClose} />
    </>
  );
};

export default CollationTableBody;
