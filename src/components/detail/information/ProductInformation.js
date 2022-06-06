import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Barcode from "react-barcode";
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
          <Box maxWidth={150} mt={4}>
            <Barcode
              marginTop={6}
              width={1}
              height={50}
              fontSize={14}
              background="#ccffff"
              value={"PROD" + sku} // add store identity ?
              text={"PRODUCT: " + sku}
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
