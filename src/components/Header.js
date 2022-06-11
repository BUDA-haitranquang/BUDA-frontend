import { Toolbar, Typography} from "@mui/material";
import AccountMenu from "./AccountMenu";
import { useLocation } from "react-router-dom";

const names = {
  "/Dashboard": "Dashboard",
  "/Business/sell": "Create order",
  "/Business/sell-history": "Sell Order History",
  "/Business/buy": "Create buy order",
  "/Business/buy-history": "Buy order list",
  "/Product/": "Product",
  "/Product/collation": "Product Collation",
  "/Ingredient/detail": "Ingredient",
  "/Ingredient/collation": "Ingredient Collation",
  "/Supplier": "Supplier",
  "/Customer": "Customer",
  "/Staff": "Staffs",
  "/Cost/fixedcost": "Fixed Cost",
  "/Cost/fixedcostBill": "Fixed Cost Bill",
  "/Cost/othercost": "Other Cost",
  "/Statistic/business": "Retention",
  "/Statistic/customer": "Sell order",
  "/Statistic/product": "Dashboard",
  "/Statistic/reveneu": "Revenue and cost",
};

const Header = () => {
  const location = useLocation();
  return (
    <Toolbar
      sx={{
        justifyContent: "space-between",
        background: "white",
        position: "fixed",
        top: 0,
        width: "calc(100% - 240px)",
        zIndex: 1000,
        height: 20,
      }}
    >
      <Typography
        variant="h5"
        noWrap
        component="div"
        fontWeight={850}
        fontFamily="'Montserrat', san-serif"
        style={{
          textTranform: "uppercase",
          color: "black",
        }}
      >
        {names[location.pathname]}
      </Typography>

      <AccountMenu />
    </Toolbar>
  );
};

export default Header;
