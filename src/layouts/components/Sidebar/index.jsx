import { ShoppingBasketOutlined } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupsIcon from "@mui/icons-material/Groups";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import WorkIcon from "@mui/icons-material/Work";
import BarChartIcon from "@mui/icons-material/BarChart";
import DiscountIcon from "@mui/icons-material/Discount";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Box,
  Collapse,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setFocus } from "src/redux/sidebarSlice";

const useStyle = makeStyles({
  selectedItem: {
    cursor: "pointer",
    background: "rgba(45, 142, 255, 1)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "6px",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    cursor: "pointer",
    borderRadius: "6px",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subItem: {
    borderRadius: "6px",
    marginTop: "0.25rem",
    "&:hover": {
      background: "rgba(47, 143, 255, 0.68)",
    },
  },
  itemOpen: {
    transition: "transform 0.4s",
    "&:hover": {
      transition: "transform 0.4s",
      transform: "translate(10px,0px)",
    },
  },
  root: {
    margin: "0.85rem",
    "& a:link": {
      textDecoration: "none",
      color: "white",
    },
    "& a:visited": {
      color: "black",
    },
  },
  logo: {
    marginTop: "1rem",
    width: "100%",
    fontSize: "40px",
    fontWeight: "700",
    display: "flex",
    justifyContent: "center",
    textDecoration: "none",
    color: "white",
  },
});
const drawerWidth = 240;

function createData(name, link, check) {
  return { name: name, link: link, check: check };
}

const Sidebar = () => {
  const history = useHistory();
  console.log(history.location.pathname);
  const focus = useSelector((state) => state.sidebar.focus);
  const dispatch = useDispatch();
  console.log(history.location.pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const setFocusSideBar = (val) => {
    dispatch(setFocus(val));
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { t } = useTranslation(["sidebar"]);
  const classes = useStyle();

  function capitalizeFirstLetter(string) {
    if (typeof string !== "string") return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const title = [
    ["dashboard", t("sidebar:dashBoard.section")],
    ["business", t("sidebar:business.section")],
    ["product", t("sidebar:product.section")],
    ["ingredient", t("sidebar:ingredient.section")],
    ["supplier", t("sidebar:supplier.section")],
    ["customer", t("sidebar:customer.section")],
    ["staff", t("sidebar:staff.section")],
    ["cost", t("sidebar:cost.section")],
    ["statistic", t("sidebar:statistic.section")],
    ["discount", t("sidebar:discount.section")],
  ];

  const sidebarItems = [
    [
      createData("Overall", "overall", ""),
      // createData("Incomplete", "incomplete", ""),
    ],
    [
      createData(t("sidebar:business.sell"), "sell", ""),
      createData(t("sidebar:business.sellHistory"), "sell-history", ""),
      createData(t("sidebar:business.buy"), "buy", ""),
      createData(t("sidebar:business.buyHistory"), "buy-history", ""),
    ],
    [
      createData(t("sidebar:product.product"), "", ""),
      createData(t("sidebar:product.collation"), "collation", ""),
    ],
    [
      createData(t("sidebar:ingredient.ingredient"), "detail", ""),
      createData(t("sidebar:ingredient.collation"), "collation", ""),
    ],
    [createData(t("sidebar:supplier.section"), "supplier", "")],
    [createData(t("sidebar:customer.section"), "customer", "")],

    [createData("Note", "note", "")],
    [
      createData(t("sidebar:cost.fixed"), "fixedcost", ""),
      createData(t("sidebar:cost.fixedCostBill"), "fixedcostBill", ""),
      createData(t("sidebar:cost.otherCost"), "othercost", ""),
    ],
    [
      createData("Business", "business", ""),
      createData("Customer", "customer", ""),
      createData("Product", "product", ""),
      createData("Revenue", "revenue", ""),
    ],
    [createData(t("sidebar:discount.section"), "discount", "")],
  ];

  const itemRender = (i) => {
    switch (i) {
      case 0:
        return <AddShoppingCartIcon />;
      case 1:
        return <WorkIcon />;
      case 2:
        return <ShoppingBasketOutlined />;
      case 3:
        return <StoreIcon />;
      case 4:
        return <ShoppingCartIcon />;
      case 5:
        return <GroupsIcon />;
      case 6:
        return <AssignmentIndIcon />;
      case 7:
        return <MonetizationOnIcon />;
      case 8:
        return <BarChartIcon />;
      case 9:
        return <DiscountIcon />;
      default:
        break;
    }
  };
  const logo = (
    <>
      <Box className={classes.logo} component={Link} to="/dashboard/buy">
        BUDA
      </Box>
    </>
  );
  const drawer = (
    <div
      style={{
        backgroundImage: "linear-gradient(#1367ba, #409fff)",
        flexGrow: 1,
      }}
    >
      <Toolbar children={logo} />
      <List className={classes.root}>
        {title.map((item, idx) => (
          <>
            <ListItem
              className={
                history.location.pathname.includes(item[0])
                  ? classes.selectedItem
                  : classes.item
              }
              onClick={() => {
                let value = focus === item[1] ? "" : item[1];
                setFocusSideBar(value);
                if (sidebarItems[idx].length === 1)
                  history.push(`/${title[idx][0].toLowerCase()}`);
              }}
            >
              <Box
                className={classes.itemOpen}
                display="flex"
                flexDirection="row"
              >
                <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  {itemRender(idx)}
                </ListItemIcon>

                <ListItemText
                  primaryTypographyProps={{
                    marginLeft: "-10px",
                    fontFamily: "'Montserrat', san-serif",
                    variant: "body2",
                  }}
                  primary={capitalizeFirstLetter(item[1])}
                  sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                />
              </Box>
              {sidebarItems[idx].length - 1 ? (
                focus === item[1] ? (
                  <ExpandLessIcon
                    style={{ color: "rgba(255, 255, 255, 0.5)" }}
                  />
                ) : (
                  <ExpandMoreIcon
                    style={{ color: "rgba(255, 255, 255, 0.5)" }}
                  />
                )
              ) : (
                ""
              )}{" "}
            </ListItem>
            {sidebarItems[idx].length - 1 ? (
              <Collapse in={focus === item[1]}>
                {sidebarItems[idx].map((component) => {
                  return (
                    <Link to={`/${item[0]}/${component.link}`}>
                      <ListItem
                        className={classes.subItem}
                        onClick={() => {
                          setFocusSideBar("");
                          setFocusSideBar(item[1]);
                        }}
                      >
                        <ListItemText
                          primaryTypographyProps={{
                            fontFamily: "'Montserrat', san-serif",
                            variant: "body2",
                          }}
                          primary={component.name}
                          style={{ color: "white" }}
                        />
                      </ListItem>
                    </Link>
                  );
                })}
              </Collapse>
            ) : (
              <></>
            )}
          </>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      ></AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;
