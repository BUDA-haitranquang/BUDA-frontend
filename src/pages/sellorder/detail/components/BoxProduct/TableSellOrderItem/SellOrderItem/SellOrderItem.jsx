import { Box, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import DefaultImage from "../../../../../../../buda-components/SVG/DefaultImage";

SellOrderItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
};

function SellOrderItem(props) {
  const { item, index } = props;

  const CellImage = useMemo(() => {
    return (
      <TableCell align="center" style={{ width: "60px" }}>
        {item.product.picture ? (
          <Box
            component="img"
            sx={{
              height: 64,
              width: 64,
            }}
            alt={item.product.name}
            src={item.product.picture.link}
          />
        ) : (
          <DefaultImage style={{ height: "40px", width: "40px" }} />
        )}
      </TableCell>
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.product.name, item.product.picture?.link]);

  const CellSKU = useMemo(() => {
    return (
      <TableCell align="left" style={{ width: "200px" }}>
        {item.product.sku}
      </TableCell>
    );
  }, [item.product.sku]);

  const CellName = useMemo(() => {
    return <TableCell align="left">{item.product.name}</TableCell>;
  }, [item.product.name]);

  const CellQuantity = useMemo(() => {
    return (
      <TableCell align="center" style={{ width: "105px" }}>
        {item.quantity.toLocaleString()}
      </TableCell>
    );
  }, [item.quantity]);

  const CellPrice = useMemo(() => {
    return (
      <TableCell align="right" style={{ width: "115px" }}>
        {item.pricePerUnit.toLocaleString()}
      </TableCell>
    );
  }, [item.pricePerUnit]);

  const CellAmount = useMemo(() => {
    return (
      <TableCell align="right" style={{ width: "115px" }}>
        {(item.quantity * item.pricePerUnit).toLocaleString()}
      </TableCell>
    );
  }, [item.quantity, item.pricePerUnit]);

  return (
    <TableRow key={index + 1}>
      <TableCell align="center" style={{ width: "55px" }}>
        {index}
      </TableCell>
      {CellImage}
      {CellSKU}
      {CellName}
      {CellQuantity}
      {CellPrice}
      {CellAmount}
    </TableRow>
  );
}

export default SellOrderItem;
