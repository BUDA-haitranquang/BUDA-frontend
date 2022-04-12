import HomeIcon from "@mui/icons-material/Home";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useHistory } from "react-router";
import AccountMenu from "../../components/AccountMenu";
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
    // "& .tabs": {
    //   borderRight: "2px solid gray",
    //   "& .tab": {
    //     border: "2px solid grey",
    //     borderRadius: "15px 15px 0 0",
    //     width: "125px",
    //     justifyContent: "center",
    //     "& .MuiButton-root": {
    //         width: "100%"
    //     }
    //   },
    // },
    justifyContent: "flex-end",
    "& .navigation": {
      justifyContent: "space-evenly",
      "& .home-icon": {
        fontSize: "40px",
        "&:hover": {
          cursor: "pointer",
          opacity: 0.6,
          transition: "all .2s"
        },
      },
    },
  },
}));

export default function Navbar() {
  const classes = useStyle();
  const history = useHistory();
  return (
    <Grid container className={classes.root}>
      {/* <Grid container xs={10} className="tabs">
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
      </Grid> */}
      <Grid container xs={2} className="navigation">
        <HomeIcon
          className="home-icon"
          onClick={() => history.push("/")}
        ></HomeIcon>
        <AccountMenu />
      </Grid>
    </Grid>
  );
}
