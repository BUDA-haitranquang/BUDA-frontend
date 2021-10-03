import React from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import {Container, Toolbar } from "@mui/material";
import Ingredients from "./Ingredients";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    padding: "0 !important",
    "& .MuiContainer-root":{
      padding: "0",
    }
  }
})
const Products = (props) => {
  const { window } = props;
  const classes = useStyles();
  return (
    <Box sx={{ display: "flex" }} >
      <Sidebar window={window} name="Products" />
      <Container className={classes.root}>
        <Toolbar />
        <Container >
          We sell Products here
        </Container>
      </Container>
    </Box>
  );
};
export default Products;
