import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import CombinedDetail from "../../components/CombinedDetail";
import { useHistory, useParams } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import { LOAD_PRODUCT, LOAD_PRODUCTS } from "../../graphQl/products/productQueries";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import EditProductModal from "../../components/modal/EditProductModal";
import ProductInformation from "../../components/detail/information/ProductInformation";
import { HIDE_PRODUCT_MUTATION } from "../../graphQl/products/productMutations";

const ProductDetail = (props) => {
  const { window } = props;
  const { id } = useParams();
  const history = useHistory();
  console.log(id);

  const [product, setProduct] = useState(null);

  const { error, loading, data, refetch } = useQuery(LOAD_PRODUCT, {
    variables: { productID: parseInt(id) },
  });

  const [hideProduct] = useMutation(HIDE_PRODUCT_MUTATION);

  const handleDeleteProduct = () => {
    hideProduct({
      variables:{productID: parseInt(id) },
      refetchQueries: [{query: LOAD_PRODUCTS}]
    })
    .then(history.push('/product'))
  }

  useEffect(() => {
    async function fetchData(){
      if(data) setProduct(data);
    }
    
    fetchData();
  }, [data]);

  if (error) return <Redirect to="/login" />;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar window={window} name="Product Detail" />
      <Box>
        <Toolbar />
        <Box pt={1}>
          {product === null ? (
            <div></div>
          ) : (
            <CombinedDetail
              data={product}
              Modal={EditProductModal}
              Information={ProductInformation}
              handleDelete={handleDeleteProduct}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default ProductDetail;
