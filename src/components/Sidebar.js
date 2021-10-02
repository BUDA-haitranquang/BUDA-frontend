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
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";

const useStyle = makeStyles({
  root: {
    "& a:link": {
      textDecoration: "none",
      color: "black",
    },
  },
});
const drawerWidth = 240;

const Sidebar = ({ window, name }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const classes = useStyle();

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List className={classes.root}>
        <Link to="/">
          <ListItem button key="Dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>{" "}
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to="/products">
          <ListItem button key="Products">
            <ListItemIcon>
              <ShoppingBasketOutlined />
            </ListItemIcon>{" "}
            <ListItemText primary="Products" />
          </ListItem>
        </Link>
        <Link to="/supplier">
          <ListItem button key="Supplier">
            <ListItemIcon>
              <ShoppingBasketOutlined />
            </ListItemIcon>{" "}
            <ListItemText primary="Supplier" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  console.log(name);
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
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {name}
          </Typography>
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
