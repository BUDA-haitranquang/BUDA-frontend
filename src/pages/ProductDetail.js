import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import CombinedDetail from "../components/CombinedDetail";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { LOAD_PRODUCT } from "../graphQl/products/productQueries";
import EditProductModal from "../components/modal/EditProductModal";
import ProductInformation from "../components/detail/information/ProductInformation";

const ProductDetail = (props) => {
  const { window } = props;
  const {id} = useParams();
  console.log(id);

  const [product, setProduct] = useState(null)

  const { error, loading, data, refetch } = useQuery(LOAD_PRODUCT, {
    variables: {productID: parseInt(id)},
  });

  useEffect(()=>{
    if(data) setProduct(data);
  }, [data])

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Product Detail" />
      <Box>
        <Toolbar />
        <Box pt={1}>
            {product === null ? <div></div> : <CombinedDetail data={product} Modal={EditProductModal} Information={ProductInformation} />}
        </Box>
      </Box>
    </Box>
  );
};
export default ProductDetail;