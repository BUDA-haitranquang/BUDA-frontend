import { useMutation, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Redirect } from "react-router-dom";
import {
  AlertErrorProp,
  AlertSuccessProp,
} from "../buda-components/alert/BudaNoti";
import CombinedDetail from "../components/CombinedDetail";
import ProductInformation from "../components/detail/information/ProductInformation";
import EditProductModal from "../components/modal/EditProductModal";
import { HIDE_PRODUCT_MUTATION } from "../graphQl/products/productMutations";
import {
  LOAD_COMPONENTS_BY_PRODUCT,
  LOAD_PRODUCT,
  LOAD_PRODUCT_COMBO_INCLUDE_PRODUCT,
  LOAD_PRODUCT_GROUP_BY_PRODUCT,
  LOAD_PRODUCTS,
} from "../graphQl/products/productQueries";

const ProductDetail = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const history = useHistory();

  const [product, setProduct] = useState(null);
  const [productCombo, setProductCombo] = useState(null);
  const [productGroup, setProductGroup] = useState(null);
  const [productComponent, setProductComponent] = useState(null);

  const productDetail = useQuery(LOAD_PRODUCT, {
    variables: { productID: parseInt(id) },
  });

  const productComboData = useQuery(LOAD_PRODUCT_COMBO_INCLUDE_PRODUCT, {
    variables: { productID: parseInt(id) },
  });

  const productGroupData = useQuery(LOAD_PRODUCT_GROUP_BY_PRODUCT, {
    variables: { productID: parseInt(id) },
  });

  const productComponentData = useQuery(LOAD_COMPONENTS_BY_PRODUCT, {
    variables: { productID: parseInt(id) },
  });

  const [hideProduct] = useMutation(HIDE_PRODUCT_MUTATION);

  const handleDeleteProduct = () => {
    hideProduct({
      variables: { productID: parseInt(id) },
      refetchQueries: [{ query: LOAD_PRODUCTS }],
    })
      // @ts-ignore
      .then(history.push("/product"))
      .then((res) => {
        enqueueSnackbar("Product deleted", AlertSuccessProp);
      })
      .catch((e) => enqueueSnackbar("An error happened", AlertErrorProp));
  };

  useEffect(() => {
    async function fetchData() {
      if (productDetail.data) setProduct(productDetail.data);
    }

    fetchData();
  }, [productDetail.data]);

  useEffect(() => {
    async function fetchComboData() {
      if (productComboData.data) setProductCombo(productComboData.data);
    }

    fetchComboData();
  }, [productComboData.data]);

  useEffect(() => {
    async function fetchGroupData() {
      if (productGroupData.data) setProductGroup(productGroupData.data);
    }

    fetchGroupData();
  }, [productGroupData.data]);

  useEffect(() => {
    async function fetchComponentData() {
      if (productComponentData.data)
        setProductComponent(productComponentData.data);
    }

    fetchComponentData();
  }, [productComponentData.data]);

  if (productDetail.error) return <Redirect to="/login" />;

  return (
    <Box sx={{ display: "flex" }}>
      <Box pt={1}>
        {product === null ? (
          <div></div>
        ) : (
          <CombinedDetail
            // @ts-ignore
            data={{ product, productCombo, productGroup, productComponent }}
            Modal={EditProductModal}
            Information={ProductInformation}
            handleDelete={handleDeleteProduct}
          />
        )}
      </Box>
    </Box>
  );
};
export default ProductDetail;
