import { useMutation } from "@apollo/client";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import _ from "lodash";
import { useSnackbar } from "notistack";
import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertSuccessProp } from "../../buda-components/alert/BudaNoti";
import Sidebar from "../../components/Sidebar";
import { LOAD_PRODUCTS } from "../../graphQl/products/productQueries";
import { NEW_SELL_ORDER_MUTATION } from "../../graphQl/sellOrder/newSellOrderMutation";
import { clearProductCart } from "../../redux/productCartSlice";
import CustomerInfo from "./customer/customerInfoPane/CustomerInfo";
import SearchCustomerBar from "./customer/customerInfoPane/SearchCustomerBar";
import CustomerPayment from "./customer/customerPayment/CustomerPayment";
import CostGrid from "./order/costpane/CostGrid";
import OrderProducts from "./order/itemspane/OrderProducts";
import SearchProductBar from "./order/itemspane/SearchProductBar";

export const color1 = "#FAFAFA";
export const color2 = "#3399FF";
export const color3 = "#D1D1D1";
export const color4 = "#FFFFFF";

export default function CreateOrder() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { productCart, discount, customer } = useSelector(
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
        pricePerUnit: item.sellingPrice
      };
    });

    // const sellOrderInfoMapped = sellOrderInfo.map((item) => {
    //   const { sellingPrice: pricePerUnit, ...rest } = item;
    //   return { pricePerUnit, ...rest };
    // });

    // mutation này nếu không hiểu thì xem comment trong newSellOrderMutation.js
    try {
      await newSellOrder({
        variables: {
          sellOrderItemDTOs: sellOrderInfoMapped,
          status: "FINISHED",
          customerID: customer?.customerID,
          discountID: discount?.discountID
        },
        refetchQueries: [{ query: LOAD_PRODUCTS }]
      });

      await enqueueSnackbar("New order created successfully", AlertSuccessProp);
      await dispatch(clearProductCart());
      window.location.reload();
    } catch (e) {
      if (e.graphQLErrors[0].extensions.response.body)
        alert(e.graphQLErrors[0].extensions.response.body);
      else alert(e.message);
      // setTimeout(1000);
    } finally {
      // window.location.reload();
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar sx={{ backgroundColor: "#1976d2" }} />
      <Grid
        container
        sx={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "80px" }}
      >
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
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              onClick={createNewOrder}
              variant="contained"
              color="success"
              disabled={productCart.length <= 0}
              sx={{
                marginTop: "24px",
                width: "40%",
                height: "60px"
              }}
            >
              <Typography variant="h5">DONE</Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
