import React from "react";
import { TableBody, TableRow, TableCell, Checkbox , TextField } from "@mui/material";
import { getComparator, stableSort } from "../../../utils/tableUtils";
import { Link } from "react-router-dom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { makeStyles, styled } from "@mui/styles";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});




const useStyle = makeStyles({
    root: {
      "& .MuiTableCell-root":{
        padding: "6px 16px 6px 16px",
      },
      
    },
    ".MuiButtonBase-root-MuiButton-root":{
        align : "left",
      }
  });

const ProductDeleteTableBody = ({
  order,
  orderBy,
  selected,
  page,
  rowPerPage,
  setSelected,
  data,
}) => {
  const handleClick = (e, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected,id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: "20px",
    align : "left"
  };

    const classes = useStyle();
    const [open,setOpen] = React.useState(false);
    const changeOpen = () => {setOpen(true)};
    const changeClose = () => {setOpen(false)};
    const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <TableBody>
      {stableSort(data, getComparator(order, orderBy)).map((row, idx) => {
        const isItemSelected = isSelected(row.productID);
        const labelId = `enhanced-table-checkbox-${idx}`;
        return (
          <CustomWidthTooltip title={row.description}> 
            <TableRow 
                //classes={{root: classes.customTable}}
                sx={{ 
                    cursor: "pointer",
                    height: 50,
                }}
                hover
                //onClick={(e) => handleClick(e, row.productID)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.name}
                selected={isItemSelected}
            >
              {/* <TableCell align="center" padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </TableCell> */}
              {/* <TableCell align="right">{row.id}</TableCell> */}
              <TableCell  
                component="th" id={labelId} scope="row"  sx={{padding: "6px 16px 6px 32px"}} >
                <Link
                  to={{
                    pathname: `product/${row.productID}`,
                    // state: { data: row },
                  }}
                  style={{ textDecoration: "none", color: "blue" }}
                  sx = {{pl : 2}}
                >
                  {row.name}
                </Link>
              </TableCell>

              
              <TableCell align="center"  sx={{padding: "6px 16px 6px 16px"}}>{row.amountLeft}</TableCell>
              <TableCell align="center"  sx={{padding: "6px 16px 6px 16px"}}>{row.alertAmount}</TableCell>
              <TableCell align="center">
                    <TextField
                        sx={{
                            width : 100,
                        }}
                        size="small" 
                        type="number"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </TableCell>
               <TableCell align="center">
                    <Button onClick={changeOpen}> Details</Button>
                    <Modal
                        open = {open}
                        onClose={changeClose}
                        // aria-labelledby="modal-modal-title"
                        // aria-describedby="modal-modal-description"
                    >
                       <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Title
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Noi dung : Dm huy anh
                            </Typography>
                            <Button className="MuiButtonBase-root-MuiButton-root" sx = {{width : 336 , height : 60}} onClick={changeClose}>Close</Button>
                        </Box>
                    </Modal>
               </TableCell> 
            </TableRow>
          </CustomWidthTooltip>
        );
      })}
    </TableBody>
  );
};

export default ProductDeleteTableBody;
