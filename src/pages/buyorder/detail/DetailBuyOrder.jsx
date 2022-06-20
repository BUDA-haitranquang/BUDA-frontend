import { useQuery, useLazyQuery } from "@apollo/client";
import PrintIcon from "@mui/icons-material/Print";
import { Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { AlertErrorProp } from "../../../buda-components/alert/BudaNoti";
import BuyOrderDetailPrintForm from "../../../components/printforms/BuyOrderDetailPrintForm";
import { LOAD_BUY_ORDER, PRINT_BUY_ORDER } from "../../../graphQl/buyorders/BuyOrderQueries";
import { dateToDateString } from "../../../utils/utils";
import BoxAdditionalInfo from "./components/BoxAdditionalInfo/BoxAdditionalInfo";
import BoxIngredient from "./components/BoxIngredient/BoxIngredient";
import BoxMoney from "./components/BoxMoney/BoxMoney";
import BoxSupplier from "./components/BoxSupplier/BoxSupplier";

DetailBuyOrder.propTypes = {};

function DetailBuyOrder(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("buyorder", { keyPrefix: "detail" });
  const [buyOrder, setBuyOrder] = useState(null);
  const [buyOrderPrintInfo, setBuyOrderPrintInfo] = useState();
  const { id } = useParams();

  const componentRef = useRef();

  const { data } = useQuery(LOAD_BUY_ORDER, {
    variables: {
      buyOrderID: parseInt(id),
    },
  });

  const [printBuyOrder] = useLazyQuery(PRINT_BUY_ORDER);

  useEffect(() => {
    async function fetchData() {
      if (data) {
        setBuyOrder(data.buyOrder);
      }
    }

    fetchData();
  }, [data]);

  const print = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = (buyOrderID, storeID) => {
    printBuyOrder({
      variables: {
        buyOrderID: buyOrderID,
        storeID: storeID
      }
    })
      .then((res) => {
        setBuyOrderPrintInfo(res.data.printBuyOrder)
      })
      .then(() => {
        print();
      })
      .catch((e) => enqueueSnackbar("An error happened", AlertErrorProp))
  }

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
          <Box
            paddingBottom={2}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography variant="h4">{buyOrder?.textID}</Typography>
            <Button variant="contained" onClick={() => handlePrint(parseInt(id), 6)}>
              <PrintIcon style={{ marginRight: "10px" }} />
              Print
            </Button>
          </Box>

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
      <Box sx={{ position: "fixed", left: "100vw" }}>
        <BuyOrderDetailPrintForm ref={componentRef} buyOrderPrintInfo={buyOrderPrintInfo}/>
      </Box>
    </Box>
  );
}

export default DetailBuyOrder;
