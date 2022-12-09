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
import useStyles from "./TableBuyOrderItems.styles";
import BuyOrderItem from "./BuyOrderItem/BuyOrderItem";
import { useTranslation } from "react-i18next";

TableBuyOrderItem.propTypes = {
  buyOrderItems: PropTypes.array,
};

function TableBuyOrderItem(props) {
  const { buyOrderItems } = props;
  const { t } = useTranslation("buyorder", {
    keyPrefix: "detail.boxIngredientList",
  });

  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <TableContainer className={classes.root}>
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
        <TableBody className="TableBuyOrderItem-Body">
          {buyOrderItems?.map((item, index) => (
            <BuyOrderItem
              item={item}
              index={index + 1}
              key={item.ingredient.ingredientID}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableBuyOrderItem;
