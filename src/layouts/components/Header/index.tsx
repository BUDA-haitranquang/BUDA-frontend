import { Toolbar, Typography } from "@mui/material";
import AccountMenu from "src/layouts/components/Header/AccountMenu";
import { useLocation } from "react-router-dom";

interface typeOfName {
  [key: string]: string;
}

const names: typeOfName = {
  "/dashboard": "Dashboard",
  "/business/sell": "Create order",
  "/business/sell-history": "Sell Order History",
  "/business/buy": "Create buy order",
  "/business/buy-history": "Buy order list",
  "/product/": "Product",
  "/product/collation": "Product Collation",
  "/ingredient/detail": "Ingredient",
  "/ingredient/collation": "Ingredient Collation",
  "/supplier": "Supplier",
  "/customer": "Customer",
  "/staff": "Staffs",
  "/cost/fixedcost": "Fixed Cost",
  "/cost/fixedcostBill": "Fixed Cost Bill",
  "/cost/othercost": "Other Cost",
  "/statistic/business": "Retention",
  "/statistic/customer": "Sell order",
  "/statistic/product": "Dashboard",
  "/statistic/revenue": "Revenue and cost",
};

const Header = () => {
  const location = useLocation();
  return (
    <Toolbar
      sx={{
        justifyContent: "space-between",
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.2))",
        backdropFilter: "blur(10px)",
        position: "fixed",
        top: 0,
        width: "calc(100% - 240px)",
        zIndex: 1000,
        height: 20,
        boxShadow: "1px 2px 3px rgba(255, 255, 255,0.5)",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Typography
        variant="h5"
        noWrap
        component="div"
        fontWeight={850}
        fontFamily="'Montserrat', san-serif"
        style={{
          textTransform: "uppercase",
          color: "#1367ba",
        }}
      >
        {names[location.pathname]}
      </Typography>

      <AccountMenu />
    </Toolbar>
  );
};

export default Header;
