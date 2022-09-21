import { Box, Hidden, styled } from "@mui/material";
import { Fragment } from "react";
import Header from "src/layouts/components/Header";
import Sidebar from "src/layouts/components/Sidebar";

const MainContentWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(4, 2, 7, 2),
  marginLeft: 0,
  minHeight: "calc(100vh - 56px)",
  height: "100%",
  transition: "margin-left 300ms ease",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
}));

export default function MainLayout(props) {
  const { children } = props;
  return (
    <Fragment>
      <Box display="flex">
        <Sidebar />
        <Box
          display="flex"
          flexDirection="column"
          flexShrink={1}
          component="main"
          sx={{
            width: "100%",
            pt: { xs: 7 },
            minHeight: { xs: "calc(100vh - 55)", xsm: "100vh" },
          }}
        >
          <Hidden xsDown implementation="css">
            <Header />
          </Hidden>
          <MainContentWrapper>
            <Box sx={{ flexGrow: 1,  width: "100%" }}>
              {children}
            </Box>
          </MainContentWrapper>
          <Hidden xsUp implementation="css"></Hidden>
        </Box>
      </Box>
    </Fragment>
  );
}
