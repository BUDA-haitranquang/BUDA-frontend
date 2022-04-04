import { useMutation } from "@apollo/client";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import _ from "lodash";
import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_PRODUCTS } from "../../graphQl/products/productQueries";
import { NEW_SELL_ORDER_MUTATION } from "../../graphQl/sellOrder/newSellOrderMutation";
import { clearProductCart } from "../../redux/productCartSlice";
import CustomerInfo from "./customer/customerInfoPane/CustomerInfo";
import SearchCustomerBar from "./customer/customerInfoPane/SearchCustomerBar";
import CustomerPayment from "./customer/customerPayment/CustomerPayment";
import Navbar from "./Navbar";
import CostGrid from "./order/costpane/CostGrid";
import OrderProducts from "./order/itemspane/OrderProducts";
import SearchProductBar from "./order/itemspane/SearchProductBar";
import Services from "./order/others/services/Services";
import Shipping from "./order/others/Shipping";

export const color1 = "#FAFAFA";
export const color2 = "#3399FF";
export const color3 = "#D1D1D1";
export const color4 = "#FFFFFF";

const useStyle = makeStyles(() => ({
  root: {
    backgroundColor: `${color1}`,
    height: "100vh",
    overflow: "hidden",
    "& .main-order-grid": {
      "& .others": {
        "& .MuiGrid-root": {
          height: "26vh",
          backgroundColor: `${color4}`,
          border: "2px solid gray",
          padding: "6px",
          overflow: "hidden",
        },
      },
    },
  },
}));

export default function CreateOrder() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { productCart, totalPrice, discount } = useSelector(
    (state) => state.productCart
  );
  const [newSellOrder] = useMutation(NEW_SELL_ORDER_MUTATION);

  // hàm này xử lý khá là phức tạp
  // ai bên frontend đọc không hiểu thì hỏi Tiennd nhé
  // #tatcataiTranQuangHai
  const createNewOrder = async () => {

    // Cái _ là lodash nhé (nôm na thì lodash là một thư viện chứa các utilities khá là mạnh)
    // Tại sao phải dùng clone ở đây ?
    // Từ từ nhé, đọc chậm thôi này:
    // Khi gửi request tạo newSellOrder đến phía server (cụ thể là GraphQL),
    // Ta không thể truyền productCart, mà phải truyền theo yêu cầu API
    // -> ta chỉ lọc lấy 1 vài thuộc tính (và đổi tên nếu cần)
    // Nếu thao tác trực tiếp trên productCart, khi mutate dữ liệu, làm ảnh hưởng đến các component khác
    // cũng như tính đúng đắn (vd: let a = b. Khi a thay đổi thì b cũng bị thay đổi)
    // --> clone (giống pass by value)
    const sellOrderInfo = _.clone(productCart);

    const sellOrderInfoMapped = sellOrderInfo.map((item) => {
      return {
        productID: item.productID,
        quantity: item.quantity,
        pricePerUnit: item.sellingPrice,
      };
    });

    // const sellOrderInfoMapped = sellOrderInfo.map((item) => {
    //   const { sellingPrice: pricePerUnit, ...rest } = item;
    //   return { pricePerUnit, ...rest };
    // });

    // mutation này nếu không hiểu thì xem comment trong newSellOrderMutation.js
    try {
      const response = await newSellOrder({
        variables: {
          sellOrderItemDTOs: sellOrderInfoMapped,
          status: "FINISHED"
          // discountID: 3
        },
        refetchQueries: [{ query: LOAD_PRODUCTS }],
      });
      console.log(response);
    } catch (e) {
      console.table(e);
      // alert(e.graphQLErrors[0].extensions.response.body);
      alert(e.message);
    }

    dispatch(clearProductCart());
  };

  return (
    <Box className={classes.root}>
      <Navbar />
      <Grid container sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <Grid item xs={8} className="main-order-grid">
          <SearchProductBar />
          <Box className="itemsPane">
            <OrderProducts />
            {/* <Grid container className="others"> tạm thời chưa deploy tính năng này
              <Services /> 
              <Shipping />
            </Grid> */}
          </Box>
          <CostGrid />
        </Grid>
        <Grid
          item
          xs={4}
          className="customer"
          sx={{ paddingLeft: "10px", paddingRight: "10px" }}
        >
          <SearchCustomerBar />
          <CustomerInfo />
          <CustomerPayment />
        </Grid>
        <Button
          onClick={createNewOrder}
          variant="contained"
          disabled={productCart.length <= 0}
        >
          DONE
        </Button>
      </Grid>
    </Box>
  );
}
