import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Box, TableCell, TableRow } from "@mui/material";

SellOrderItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
  };
  
  function SellOrderItem(props) {
    const { item, index } = props;
    const CellImage = useMemo(() => {
      return (
        <TableCell align="center" style={{ width: "60px" }}>
          <Box
            component="img"
            sx={{
              height: 64,
              width: 64,
            }}
            alt={item.product.name}
            src={item.product.picture.link}
          />
        </TableCell>
      );
    }, [item.product.name, item.product.picture.link]);
  
    const CellSKU = useMemo(() => {
      return (
        <TableCell align="left" style={{ width: "75px" }}>
          {item.product.sku}
        </TableCell>
      );
    }, [item.product.sku]);
  
    const CellName = useMemo(() => {
      return <TableCell align="left" style={{ width: "115px" }}>{item.product.name}</TableCell>;
    }, [item.product.name]);
  
    const CellAmount = useMemo(() => {
      return (
        <TableCell align="center" style={{ width: "75px" }}>
          {item.product.amountLeft}
        </TableCell>
      );
    }, [item.product.amountLeft]);
  
    const CellSellingPrice = useMemo(() => {
      return (
        <TableCell align="center" style={{ width: "75px" }}>
          {item.product.sellingPrice}
        </TableCell>
      );
    }, [item.product.sellingPrice]);
    
    const CellDescription = useMemo(() =>{
      return (
        <TableCell align="left" style={{ width: "115px" }}>
          {item.product.description}
        </TableCell>
      )
    })
    
  
    return (
      <TableRow key={index + 1}>
        <TableCell align="center" style={{ width: "55px" }}>
          {index}
        </TableCell>
        {CellImage}
        {CellSKU}
        {CellName}
        {CellDescription}
        {CellAmount}
        {CellSellingPrice}
      </TableRow>
    );
  }
  
  export default SellOrderItem;
  