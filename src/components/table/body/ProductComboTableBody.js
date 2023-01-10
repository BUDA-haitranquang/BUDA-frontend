import { Box, IconButton, TableCell, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ProductComboTableBody = (props) => {
  const { row, labelId } = props;

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="left">{row.description}</TableCell>
      <TableCell sx={{width: "50%"}}>
        <Box>
          <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
        </IconButton>
        <Box>
          {row.productComboItems.map((productItem) => (
            <Box sx={{display: open ? "block" : "none"}}>
              <Link
                to={{ pathname: `/product/${productItem.product.productID}` }}
                style={{ textDecoration: "none", color: "blue" }}
              >
                {productItem.product.name}
              </Link>
              <Typography>{productItem.product.sellingPrice.toLocaleString()}</Typography>
              <Typography>{productItem.quantity.toLocaleString()}</Typography>
            </Box>
          ))}
        </Box>
        </Box>
        
      </TableCell>
    </>
  );
};

export default ProductComboTableBody;
