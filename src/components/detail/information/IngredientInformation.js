import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MainImage from "../MainImage";

export default function IngredientInformation({ data }) {
  const {
    sku,
    name,
    price,
    amountLeft,
    alertAmountLeft,
    description,
    picture
  } = data.ingredient;
  return (
    <Grid container direction="row">
      <Grid item xs={3} style={{ height: "100%" }}>
        {picture ? (
          <MainImage source={picture.pictureLink} />
        ) : (
          <MainImage
            source="https://cdn2.iconfinder.com/data/icons/small-buttons/64/Button_pressed_with_add_icon-512.png" />
        )}
      </Grid>
      <Grid
        item
        xs={8}
        direction="column"
        style={{
          height: "100%",
          justifyContent: "space-between",
          marginLeft: "5%"
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
          <Typography variant="h4">{price} VND</Typography>
          <Divider />
          <Box
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Typography variant="subtitle3" style={{}}>
              Amount Left: {amountLeft}
            </Typography>
            <Typography variant="subtitle3" style={{}}>
              Alert Amount: {alertAmountLeft}
            </Typography>
          </Box>
        </Box>

        <Divider />
      </Grid>
    </Grid>
  );
}
