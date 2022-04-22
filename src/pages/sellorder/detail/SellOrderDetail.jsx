import React, { useEffect, useState } from "react";
import BoxCustomer from "./components/BoxCustomer/BoxCustomer";
import { Box, Grid, Toolbar, Typography } from "@mui/material";
import BoxAdditionalInfo from "./components/BoxAddtionalInfo/BoxAddtionalInfo";
import Sidebar from "../../../components/Sidebar";
import BoxProduct from "./components/BoxProduct/BoxProduct";
// import { LOAD_SELL_ORDER } from "../../../graphQl/sellOrder/SellOrderQueries"
import { LOAD_SELL_ORDER_DETAILS } from "../../../graphQl/sellOrder/sellOrderQueries";
import { useParams } from "react-router-dom";
import { dateToDateString } from "../../../utils/utils";
import { useQuery } from "@apollo/client";

SellOrderDetail.propTypes = {};

function SellOrderDetail(props) {
  const { window } = props;
  const [sellOrder, setSellOrder] = useState(null);
  const { id } = useParams();

  const { data } = useQuery(LOAD_SELL_ORDER_DETAILS, {
    variables: {
      sellOrderID: parseInt(id),
    },
  });

  useEffect(() => {
    async function fetchData() {
      if (data) {
        setSellOrder(data.sellOrder);
      }
    }
    fetchData();
  }, [data]);

  return (
    <Box sx={{ display: "flex"}}>
      <Sidebar window={window} name="Sell Order" />

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Toolbar />
        <Box padding={3} width="100%" bgcolor="#f0f2f5">
          <Typography variant="h4" paddingBottom={2}>
            {sellOrder?.textID}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={8} >
              <BoxCustomer customer={sellOrder?.customer} />
            </Grid>
            <Grid item xs={4} >
              <BoxAdditionalInfo
                status={sellOrder?.status}
                textID={sellOrder?.textID}
                creationTime={dateToDateString(sellOrder?.creationTime)}
                finishTime={dateToDateString(sellOrder?.finishTime)}
              />
            </Grid>
            <Grid item xs={12}>
              <BoxProduct sellOrderItems={sellOrder?.sellOrderItems} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default SellOrderDetail;
