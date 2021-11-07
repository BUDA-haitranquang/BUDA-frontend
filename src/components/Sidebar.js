import React, { useState } from "react";
import {
  Typography,
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { ShoppingBasketOutlined } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from '@mui/icons-material/Store';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PaymentIcon from '@mui/icons-material/Payment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountMenu from "./AccountMenu";

const useStyle = makeStyles({
  root: {
    "& a:link": {
      textDecoration: "none",
      color: "black",
      "&:hover":{
        color: "grey",
        fontStyle: "italic",
        fontWeight: "600"
      }
    },
    "& a:visited": {
      color: "black",
    },
  },
});
const drawerWidth = 200;

const Sidebar = ({ window, name }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
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
        return <DashboardIcon />;
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
      
      default:
        break;
    }
  };

  const drawer = (
    <div style={{backgroundColor: "aliceblue", flexGrow: 1}}>
      <Toolbar />
      <Divider />
      <List className={classes.root}>
        {["dashboard", "product", "ingredient", "supplier", "customer", "staff", "cost"].map(
          (item, idx) => (
            <Link to={`/${item}`}>
              <ListItem button>
                <ListItemIcon>{itemRender(idx)}</ListItemIcon>
                <ListItemText primary={capitalizeFirstLetter(item)}/>
              </ListItem>
            </Link>
          )
        )}
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
          // ml: 0
        }}
      >
        <Toolbar sx={{justifyContent: "space-between"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{textTranform: "uppercase"}}>
            {name}
          </Typography>
          <AccountMenu/>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block"},
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
            display: { sm: "block" },
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
