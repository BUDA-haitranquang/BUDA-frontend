import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountMenu from "../../components/AccountMenu";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { color1, color3 } from "./CreateOrder";

const useStyle = makeStyles((theme) => ({
  root: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "4%",
    paddingRight: "4%",
    marginBottom: "12px",
    backgroundColor: `${color3}`,
    borderBottom: "3px solid blue",
    "& > *": {
      color: `${color1}`,
      fontSize: 24,
    },
    "& .tabs": {
      borderRight: "2px solid gray",
      "& .tab": {
        border: "2px solid grey",
        borderRadius: "15px 15px 0 0",
        width: "125px",
        justifyContent: "center",
        "& .MuiButton-root": {
            width: "100%"
        }
      },
    },
    "& .navigation": {
      justifyContent: "space-evenly",
    },
  },
}));

export default function Navbar() {
  const classes = useStyle();
  return (
    <Grid container className={classes.root}>
      <Grid container xs={10} className="tabs">
        <Box className="tab" component="span">
          <Button>
            <Typography>Order 1</Typography>
          </Button>
        </Box>
        <Box className="tab" component="span">
          <Button>
            <Typography>Order2</Typography>
          </Button>
        </Box>
        <Box className="tab" component="span">
          <Button>
            <Typography>Order3</Typography>
          </Button>
        </Box>
        <AddBoxIcon sx={{marginLeft: "20px", fontSize: 40 }}/>
      </Grid>
      <Grid container xs={2} className="navigation">
        <HomeIcon sx={{ fontSize: 40 }}></HomeIcon>
        <AccountMenu />
      </Grid>
    </Grid>
  );
}
