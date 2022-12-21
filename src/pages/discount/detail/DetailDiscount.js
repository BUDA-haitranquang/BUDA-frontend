import React, { useEffect, useState } from "react";
import BoxPrimaryInfo from "./components/BoxPrimaryInfo/BoxPrimaryInfo";
import { Box, Grid, Toolbar, Typography } from "@mui/material";
import BoxAdditionalInfo from "./components/BoxAdditionalInfo/BoxAdditionalInfo";
import { LOAD_DISCOUNT } from "../../../graphQl/discounts/discountQueries";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { dateToDateString } from "../../../utils/utils";
import { useTranslation } from "react-i18next";

DetailDiscount.propTypes = {};

function DetailDiscount() {
  const { t } = useTranslation("discount", { keyPrefix: "detail" });
  const [discount, setDiscount] = useState(null);
  const { id } = useParams();

  const { data } = useQuery(LOAD_DISCOUNT, {
    variables: {
      discountID: parseInt(id),
    },
  });

  useEffect(() => {
    async function fetchData() {
      if (data) {
        setDiscount(data.discount);
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
        <Box padding={3} width="100%" bgcolor="#f0f2f5">
          <Typography variant="h4" paddingBottom={2}>
            {discount?.discountCode}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={9}>
              <BoxPrimaryInfo discount={discount} />
            </Grid>
            <Grid item xs={3}>
              <BoxAdditionalInfo
                creationTime={dateToDateString(discount?.createdTime)}
                finishTime={dateToDateString(discount?.expiryTime)}
                description={discount?.description}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default DetailDiscount;
