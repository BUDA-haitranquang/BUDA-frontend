import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, IconButton, TableCell, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ProductComboTableBody = (props) => {
  const { row, labelId } = props;

  const { t } = useTranslation(["common", "product"]);

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="left">{row.description}</TableCell>
      <TableCell sx={{ width: "50%" }}>
        <Box>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
          <Box sx={{ marginLeft: "10%", display: open ? "block" : "none" }}>
            {row.productComboItems.map((productItem) => (
              <Box>
                <Link
                  to={{ pathname: `/product/${productItem.product.productID}` }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textDecoration: "none",
                      color: "blue",
                      marginTop: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    {productItem.product.name}
                  </Typography>
                </Link>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", width: "50%" }}
                  >
                    <Typography sx={{ color: "gray", marginRight: "8px" }}>
                      {t("product:price")}:
                    </Typography>
                    <Typography>
                      {productItem.product.sellingPrice.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", width: "50%" }}
                  >
                    <Typography sx={{ color: "gray", marginRight: "8px" }}>
                      {t("product:quantity")}:
                    </Typography>
                    <Typography>
                      {productItem.quantity.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
            <Box sx={{ display: "flex", flexDirection: "row", marginTop: "12px" }}>
              <Typography
                sx={{ color: "gray", fontWeight: 600, marginRight: "8px" }}
              >
                {t("common:sum")}:
              </Typography>
              <Typography>
                {row.productComboItems
                  .reduce((a, b) => a + parseInt(b.product.sellingPrice), 0)
                  .toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </TableCell>
    </>
  );
};

export default ProductComboTableBody;
