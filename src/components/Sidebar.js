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
import {
  AppBar,
  Box,
  Collapse,
  CssBaseline, Drawer, List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setFocus } from "../redux/sidebarSlice";
import AccountMenu from "./AccountMenu";

const useStyle = makeStyles({
  selectedItem: {
    cursor: "pointer",
    background: "rgba(45, 142, 255, 1)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "6px",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    cursor: "pointer",
    borderRadius: "6px",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // "&:hover": {
    //   background: "rgba(45, 142, 255, 1)",
    //   boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    // },
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
      // "&:hover": {
      //   color: "grey",
      //   fontWeight: "600",
      // },
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

const title = [
  "dashboard",
  "business",
  "product",
  "ingredient",
  "supplier",
  "customer",
  "staff",
  "cost",
  // "statistic",
];

function createData(name, link, check) {
  return { name: name, link: link, check: check };
}

const sidebarItems = [
  [
    createData("Overall", "overall", ""),
    // createData("Incomplete", "incomplete", ""),
  ],
  [
    createData("Sell", "sell", ""),
    createData("Sell history", "sell-history", ""),
    createData("Buy", "buy", ""),
    createData("Buy history", "buy-history", ""),
  ],
  [createData("Product", "", ""), createData("Collation", "collation", "")],
  [
    createData("Detail", "detail", ""),
    createData("Collation", "collation", ""),
  ],
  [createData("Supplier", "supplier", "")],
  [createData("Customer", "customer", "")],

  [createData("Note", "note", "")],
  [
    createData("Fixed", "fixedcost", ""),
    createData("Fixed Cost Bill", "fixedcostBill", ""),
    createData("Other Cost", "othercost", ""),
  ],
  [
    createData("Business", "business", ""),
    // createData("Customer", "customer", ""),
    // createData("Product", "product", ""),
  ],
];
const Sidebar = ({ window, name, id }) => {
  const history = useHistory();
  const focus = useSelector((state) => state.sidebar.focus);
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const setFocusSideBar = (val) => {
    dispatch(setFocus(val));
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const classes = useStyle();

  function capitalizeFirstLetter(string) {
    if (typeof string !== "string") return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
      // case 8:
      //   return <BarChartIcon />;
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
    // <div style={{ background: "#1976d2", flexGrow: 1 }}>
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
                id.toLowerCase().includes(item.toLowerCase())
                  ? classes.selectedItem
                  : classes.item
              }
              onClick={() => {
                let value = focus === item ? "" : item;
                setFocusSideBar(value);
                if (sidebarItems[idx].length === 1)
                  history.push(`/${title[idx]}`);
              }}
            >
              <Box
                className={classes.itemOpen}
                display="flex"
                flexDirection="row"
              >
                <ListItemIcon style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  {itemRender(idx)}
                </ListItemIcon>

                <ListItemText
                  primaryTypographyProps={{
                    fontFamily: "'Montserrat', san-serif",
                  }}
                  primary={capitalizeFirstLetter(item)}
                  style={{ color: "rgba(255, 255, 255, 0.9)" }}
                />
              </Box>
              {sidebarItems[idx].length - 1 ? (
                focus === item ? (
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
              <Collapse in={focus === item}>
                {sidebarItems[idx].map((component) => {
                  return (
                    <Link to={`/${item}/${component.link}`}>
                      <ListItem className={classes.subItem}>
                        <ListItemText
                          primaryTypographyProps={{
                            fontFamily: "'Montserrat', san-serif",
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
      >
        <Toolbar sx={{ justifyContent: "space-between", background: "white" }}>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton> */}

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
            {name}
          </Typography>

          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
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
