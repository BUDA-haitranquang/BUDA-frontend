import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import CombinedTable from "../components/CombinedTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/productSlice";

const headCells = [
  {
    id: "ID",
    numeric: true,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: true,
    label: "Price",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: true,
    label: "Left",
  },
  {
    id: "cost",
    numeric: true,
    disablePadding: true,
    label: "Cost",
  },
  {
    id: "group",
    numeric: false,
    disablePadding: true,
    label: "Group",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: true,
    label: "Description",
  },
];

const Product = (props) => {
  const { window } = props;
  const products = useSelector((state) => state.product.products);
  const dp = useDispatch();
  useEffect(() => {
    dp(fetchData());
  }, []);
  return (
    <Box sx={{display: "flex"}}>
      <Sidebar window={window} name="Product" />
      <Box
        mt={3}
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Toolbar />
        <Box>{}</Box>
        <Box>
          <CombinedTable data={products} headCells={headCells} />
        </Box>
      </Box>
    </Box>
  );
};
export default Product;
