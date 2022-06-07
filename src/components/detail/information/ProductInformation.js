import PrintIcon from "@mui/icons-material/Print";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import ProductDetailPrintForm from "../../printforms/ProductDetailPrintForm";
import MainImage from "../MainImage";

export default function ProductInformation({ data }) {
  const {
    sku,
    name,
    sellingPrice,
    amountLeft,
    alertAmount,
    costPerUnit,
    description,
    picture,
  } = data.product.product;

  const productCombo = data?.productCombo?.productComboIncludeProduct;
  const productGroup = data?.productGroup?.productGroupByProduct;
  const productComponent = data?.productComponent?.componentsByProduct;

  const componentRef = useRef();

  return (
    <Grid container direction="row" fullWidth>
      <Grid item xs={3} style={{ height: "100%" }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {picture ? (
            <MainImage source={picture.pictureLink} />
          ) : (
            <MainImage source="https://cdn2.iconfinder.com/data/icons/small-buttons/64/Button_pressed_with_add_icon-512.png" />
          )}
          <Box maxWidth={150} mt={3}>
            <ProductDetailPrintForm ref={componentRef} sku={sku} />
            {/* button to trigger printing of target component */}
            <ReactToPrint
              trigger={() => (
                <Button sx={{ marginTop: "10px" }} variant="contained">
                  <PrintIcon style={{ marginRight: "10px" }} />
                  Barcode
                </Button>
              )}
              content={() => componentRef.current}
              documentTitle={"Product:" + name}
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={8}
        direction="column"
        style={{
          height: "100%",
          justifyContent: "space-between",
          marginLeft: "5%",
        }}
      >
        <Typography variant="subtitle2" style={{ textTransform: "uppercase" }}>
          Code: {<b>{sku}</b>}
        </Typography>

        <Box style={{ flexDirection: "column" }}>
          <Typography variant="h3" style={{ marginBottom: "3%" }}>
            {name}
          </Typography>
          <Typography variant="subtitle3" style={{ fontStyle: "italic" }}>
            {description}
          </Typography>
          <Typography variant="h4">
            {sellingPrice.toLocaleString()} VND
          </Typography>
          <Divider />
          <Box
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle3" style={{}}>
              Cost: {costPerUnit.toLocaleString()}
            </Typography>
            <Typography variant="subtitle3" style={{}}>
              Amount Left: {amountLeft.toLocaleString()}
            </Typography>
            <Typography variant="subtitle3" style={{}}>
              Alert Amount: {alertAmount.toLocaleString()}
            </Typography>
          </Box>
        </Box>
        <Divider />

        <Box>
          {productCombo?.map((combo) => (
            <Box
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Typography width="50%">Combo: {combo?.name}</Typography>
              <Typography width="50%">
                Description: {combo?.description}
              </Typography>
            </Box>
          ))}
        </Box>
        <Divider />

        <Box>
          {productGroup?.map((group) => (
            <Typography width="50%">Group: {group?.name}</Typography>
          ))}
        </Box>
        <Divider />

        <Box>
          {productComponent?.map((component) => (
            <Typography width="50%">
              Ingredient: {component?.ingredient.name}
            </Typography>
          ))}
        </Box>
        <Divider />
      </Grid>
    </Grid>
  );
}
