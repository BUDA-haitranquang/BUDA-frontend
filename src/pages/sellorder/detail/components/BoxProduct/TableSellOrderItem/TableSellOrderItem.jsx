import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SellOrderItem from "./SellOrderItem/SellOrderItem";
import { useTranslation } from "react-i18next";

TableSellOrderItem.propTypes = {
  sellOrderItem: PropTypes.array,
};

function TableSellOrderItem(props) {
  const { sellOrderItems } = props;
  const { t } = useTranslation("sell", {
    keyPrefix: "detail.boxItemList",
  });

  useEffect(() => {}, []);
  return (
    <TableContainer>
      <Table aria-label="simple table" style={{ borderCollapse: "inherit" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f0f2f5" }}>
            <TableCell align="center" style={{ width: "55px" }}>
              {t("no")}
            </TableCell>
            <TableCell align="center" style={{ width: "60px" }}>
              {t("image")}
            </TableCell>
            <TableCell align="left" style={{ width: "200px" }}>
              {t("sku")}
            </TableCell>
            <TableCell align="left">{t("name")}</TableCell>
            <TableCell align="center" style={{ width: "105px" }}>
              {t("quantity")}
            </TableCell>
            <TableCell align="right" style={{ width: "115px" }}>
              {t("price")}
            </TableCell>
            <TableCell align="right" style={{ width: "115px" }}>
              {t("amount")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="TableSellOrderItem-Body">
          {sellOrderItems?.map((item, index) => (
            <SellOrderItem
              item={item}
              index={index + 1}
              key={item.product.productID}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableSellOrderItem;
