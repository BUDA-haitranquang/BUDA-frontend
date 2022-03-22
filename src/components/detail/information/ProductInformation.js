import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MainImage from "../MainImage";

export default function ProductInformation({ data }) {
  const {
    name,
    sellingPrice,
    amountLeft,
    alertAmount,
    costPerUnit,
    description,
    picture,
  } = data.product;
  return (
    <Grid container direction="row">
      <Grid item xs={3} style={{ height: "100%" }}>
        <MainImage source={picture.pictureLink} />
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
          {name}
        </Typography>

        <Box style={{ flexDirection: "column" }}>
          <Typography variant="h3" style={{ marginBottom: "3%" }}>
            {name}
          </Typography>
          <Typography variant="subtitle3" style={{ fontStyle: "italic" }}>
            {description}
          </Typography>
          <Typography variant="h4">{sellingPrice} $</Typography>
          <Divider />
          <Box
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle3" style={{}}>
              Cost: {costPerUnit}
            </Typography>
            <Typography variant="subtitle3" style={{}}>
              Amount Left: {amountLeft}
            </Typography>
            <Typography variant="subtitle3" style={{}}>
              Alert Amount: {alertAmount}
            </Typography>
          </Box>
        </Box>

        <Divider />
      </Grid>
    </Grid>
  );
}
