import { useMutation } from "@apollo/client";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { NEW_SELL_ORDER_MUTATION } from "../../graphQl/sellOrder/newSellOrderMutation";
import CustomerGrid from "./customer/CustomerGrid";
import Navbar from "./Navbar";
import CostGrid from "./order/costpane/CostGrid";
import OrderProducts from "./order/itemspane/OrderProducts";
import SearchProductBar from "./order/itemspane/SearchProductBar";
import Services from "./order/others/services/Services";
import Shipping from "./order/others/Shipping";
import { LOAD_PRODUCTS } from "../../graphQl/products/productQueries";
import { clearProductCart } from "../../redux/productCartSlice";

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
  const createNewOrder = () => {
    console.log(productCart);

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
        pricePerUnit: item.sellingPrice 
      };
    });
    
    // const sellOrderInfoMapped = sellOrderInfo.map((item) => {
    //   const { sellingPrice: pricePerUnit, ...rest } = item;
    //   return { pricePerUnit, ...rest };
    // });
    console.log(sellOrderInfoMapped);

    // mutation này nếu không hiểu thì xem comment trong newSellOrderMutation.js
    newSellOrder({
      variables: {
        sellOrderItemDTOs: sellOrderInfoMapped,
        // discountID: 3
      },
      refetchQueries: [{ query: LOAD_PRODUCTS }],
    });

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
            <Grid container className="others">
              <Services />
              <Shipping />
            </Grid>
          </Box>
          <CostGrid />
        </Grid>
        <CustomerGrid />
        <Button onClick={createNewOrder} variant="contained">
          DONE
        </Button>
      </Grid>
    </Box>
  );
}
