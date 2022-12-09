import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { makeStyles } from "@mui/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const drawerWidth = 200;

const useStyle = makeStyles({
  root: {
    width: `calc(100% - ${drawerWidth})px`,
    overflowX: "hidden",
    "& > *": {
      color: "white"
    },
    "& a": {
      textDecoration: "none",
      color: "white",
      "&:hover": {
        // color: "cyan",
      }
    },
    "& .MuiBox-root": {
      display: "flex",
      marginBottom: "5px",
      "& .MuiTypography-root": {
        marginLeft: "15px"
      }
    },

    "& .MuiGrid-item": {
      paddingTop: "20px"
    }
  }
});

export default function Footer() {
  const classes = useStyle();
  return (
    <footer className={classes.root}>
      <Container
        style={{
          marginTop: "40px",
          marginLeft: `${drawerWidth}px`,
          paddingBottom: "10px",
          backgroundColor: "#1976d2"
        }}
      >
        <Grid container spacing={5} style={{ marginTop: "0" }}>
          <Grid item xs={12} sm={4}>
            <Typography
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: ".9rem",
                letterSpacing: "1px"
              }}
            >
              Made by @ Buda 2021
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box>
              <a href="/">About us</a>
            </Box>
            <Box>
              <a href="/">Services</a>
            </Box>
            <Box>
              <a href="/">How to use</a>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box className="information">
              <LocationOnIcon />
              <Typography>No. 1 Dai Co Viet Str., Hanoi</Typography>
            </Box>
            <Box className="information">
              <LocalPhoneIcon />
              <Typography>0123456789</Typography>
            </Box>
            <Box className="information">
              <FacebookIcon />
              <Typography>DevBuda</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
