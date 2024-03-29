import { Grid, Box } from "@mui/material";

import Profile from "../components/myaccount/Profile";
import Stores from "../components/myaccount/Store";
const MyAccount = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box width="100%" sx={{ paddingLeft: "10px" }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Profile />
          </Grid>
          <Grid
            item
            xs
            alignItems="center"
            justifyContent="center"
            display="flex"
          >
            <Box sx={{ width: "100%" }}>
              <Stores />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default MyAccount;
