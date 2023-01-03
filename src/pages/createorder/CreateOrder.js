import { useMutation } from "@apollo/client";
import { Button, Grid, Typography, Box } from "@mui/material";
import _ from "lodash";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { AlertSuccessProp } from "../../buda-components/alert/BudaNoti";
import { LOAD_PRODUCTS } from "../../graphQl/products/productQueries";
import { NEW_SELL_ORDER_MUTATION } from "../../graphQl/sellOrder/newSellOrderMutation";
import { clearProductCart } from "../../redux/productCartSlice";
import CustomerInfo from "./customer/customerInfoPane/CustomerInfo";
import SearchCustomerBar from "./customer/customerInfoPane/SearchCustomerBar";
import CustomerPayment from "./customer/customerPayment/CustomerPayment";
import CostGrid from "./order/costpane/CostGrid";
import OrderProducts from "./order/itemspane/OrderProducts";
import SearchProductBar from "./order/itemspane/SearchProductBar";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["sell"]);
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
      }).then(res => {
          if (res?.data?.newSellOrder?.sellOrderID)
            window.open("/business/sell/" + res.data.newSellOrder.sellOrderID);
        }
      )
      ;

      await enqueueSnackbar("New order created successfully", AlertSuccessProp);
      await dispatch(clearProductCart());
      // window.location.reload();
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
    <Box>
      <Grid
        container
        sx={{
          paddingLeft: "10px",
          paddingRight: "10px",
          borderRadius: "10px"
        }}
      >
        <Grid item xs={8} className="main-order-grid">
          <SearchProductBar />
          <Box
            className="itemsPane"
            sx={{
              borderRadius: "10px",
              border: "1px solid",
              borderColor: "#aaacad"
              // border: "5px solid",
              // borderImageSlice: 1,
              // borderImageSource:
              //   "linear-gradient(to right, #277fd6, #80bfff)",
            }}
          >
            <OrderProducts />
            {/* <Grid container className="others"> tạm thời chưa deploy tính năng này
              <Services /> 
              <Shipping />
            </Grid> */}
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          className="customer"
          sx={{
            paddingLeft: "10px",
            paddingRight: "10px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <SearchCustomerBar />
          <Box
            sx={{
              flexGrow: 1,
              borderRadius: "10px",
              border: "1px solid",
              borderColor: "#aaacad",
              background: "white"
              // border: "5px solid",
              // borderImageSlice: 1,
              // borderImageSource:
              //   "linear-gradient(to right, #80bfff, #277fd6)",
            }}
          >
            <CustomerInfo />
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ paddingLeft: "10px", paddingRight: "20px" }}>
        <Grid item xs={8}>
          <CostGrid />
        </Grid>
        <Grid item xs={4}>
          <CustomerPayment />
          <Box width="100%" display="flex" justifyContent="center">
            <Button
              onClick={createNewOrder}
              variant="contained"
              disabled={productCart.length <= 0}
              sx={{
                maxWidth: "98%",
                alignSelf: "center",
                marginTop: "24px",
                flexGrow: 1,
                backgroundImage: "linear-gradient(to right, #0ba2d9, #3ec8fa)",
                boxShadow: "none"
              }}
            >
              <Typography sx={{}} variant="h6">
                {t("sell:done")}
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
