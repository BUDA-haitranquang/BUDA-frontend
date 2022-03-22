import { ShoppingBasketOutlined } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuIcon from "@mui/icons-material/Menu";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Box,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setFocus } from "../redux/sidebarSlice";
import AccountMenu from "./AccountMenu";
const useStyle = makeStyles({
  root: {
    "& a:link": {
      textDecoration: "none",
      color: "black",
      "&:hover": {
        color: "grey",
        fontWeight: "600",
      },
    },
    "& a:visited": {
      color: "black",
    },
  },
  logo: {
    width: "100%",
    fontSize: "40px",
    fontWeight: "800",
    display: "flex",
    justifyContent: "center",
    textDecoration: "none",
    color: "black",
  },
});
const drawerWidth = 200;

const title = [
  "dashboard",
  "product",
  "ingredient",
  "supplier",
  "customer",
  "staff",
  "cost",
  "statistic",
];
function createData(name,link,check){
  return {name : name ,link : link,check : check};
}
const sidebarItems = [
  [createData('Buy','buy',''),createData('Sell','sell','')],
  [createData('Product','',''),createData('Collation','collation',''),createData('Delete','delete','')],
  [createData('Ingredient','','')],
  [createData('Supplier','supplier','')],
  [createData('Customer','customer','')],
  [createData('Note','note','')],
  [createData('Fixed','fixedcost',''),createData('Fixed Cost Bill','fixedcostBill',''),createData('Other Cost','othercost','')],
  [createData('Business','business',''),createData('Customer','customer',''),createData('Product','product','')],
]
const Sidebar = ({ window, name }) => {
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
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const itemRender = (i) => {
    switch (i) {
      case 0:
        return <AddShoppingCartIcon />;
      case 1:
        return <ShoppingBasketOutlined />;
      case 2:
        return <StoreIcon />;
      case 3:
        return <ShoppingCartIcon />;
      case 4:
        return <GroupsIcon />;
      case 5:
        return <AssignmentIndIcon />;
      case 6:
        return <MonetizationOnIcon />;
      case 7:
        return <BarChartIcon />;
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
    <div style={{ backgroundColor: "aliceblue", flexGrow: 1 }}>
      <Toolbar children={logo} />

      <Divider />
      <List className={classes.root}>
        {title.map((item, idx) => (
          <>
            <ListItem
              button
              onClick={() => {
                let value = focus === item ? "" : item;
                setFocusSideBar(value);
                if(sidebarItems[idx].length === 1) history.push(`/${title[idx]}`)
              }}
            >
              <ListItemIcon>{itemRender(idx)}</ListItemIcon>
              <ListItemText primary={capitalizeFirstLetter(item)} />
                {sidebarItems[idx].length-1 ? ( focus === item ? <ExpandLessIcon /> : <ExpandMoreIcon />) : ""}
                {" "}
            </ListItem>
            {sidebarItems[idx].length-1 ? 
            <Collapse in={focus === item}>
              {sidebarItems[idx].map((component) => {
                return (
                  <Link to= {`/${item}/${component.link}`}>
                    <ListItem button>
                      <ListItemText
                        primary={component.name}
                      />
                    </ListItem>
                  </Link>
                );
              })}
            </Collapse>
            :
            console.log(12)
            }
          </>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ textTranform: "uppercase" }}
          >
            {name}
          </Typography>
          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
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
