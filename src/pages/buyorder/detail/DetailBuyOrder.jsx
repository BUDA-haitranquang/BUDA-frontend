import React, { useEffect, useState } from "react";
import BoxSupplier from "./components/BoxSupplier/BoxSupplier";
import { Box, Grid, Toolbar, Typography } from "@mui/material";
import BoxAdditionalInfo from "./components/BoxAdditionalInfo/BoxAdditionalInfo";
import BoxIngredient from "./components/BoxIngredient/BoxIngredient";
import { LOAD_BUY_ORDER } from "../../../graphQl/buyorders/BuyOrderQueries";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { dateToDateString } from "../../../utils/utils";
import BoxMoney from "./components/BoxMoney/BoxMoney";
import { useTranslation } from "react-i18next";

DetailBuyOrder.propTypes = {};

function DetailBuyOrder(props) {
  const { t } = useTranslation("buyorder", { keyPrefix: "detail" });
  const [buyOrder, setBuyOrder] = useState(null);
  const { id } = useParams();

  const { data } = useQuery(LOAD_BUY_ORDER, {
    variables: {
      buyOrderID: parseInt(id),
    },
  });

  useEffect(() => {
    async function fetchData() {
      if (data) {
        setBuyOrder(data.buyOrder);
      }
    }

    fetchData();
  }, [data]);

  return (
    <Box sx={{ display: "flex" }}>
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
            {buyOrder?.textID}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={9}>
              <BoxSupplier supplier={buyOrder?.supplier} />
            </Grid>
            <Grid item xs={3}>
              <BoxAdditionalInfo
                status={buyOrder?.status}
                textID={buyOrder?.textID}
                creationTime={dateToDateString(buyOrder?.creationTime)}
                finishTime={dateToDateString(buyOrder?.finishTime)}
              />
            </Grid>
            <Grid item xs={12}>
              <BoxIngredient buyOrderItems={buyOrder?.buyOrderItems} />
            </Grid>
            <Grid item xs={12}>
              <BoxMoney
                totalMoney={buyOrder?.buyOrderItems.reduce(
                  (previousValue, currentValue) =>
                    previousValue +
                    currentValue.quantity * currentValue.pricePerUnit,
                  0
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default DetailBuyOrder;
