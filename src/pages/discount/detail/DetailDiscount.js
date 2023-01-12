import { useQuery } from "@apollo/client";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LOAD_DISCOUNT } from "../../../graphQl/discounts/discountQueries";
import { dateToDateString } from "../../../utils/utils";
import BoxAdditionalInfo from "./components/BoxAdditionalInfo/BoxAdditionalInfo";
import BoxPrimaryInfo from "./components/BoxPrimaryInfo/BoxPrimaryInfo";

DetailDiscount.propTypes = {};

function DetailDiscount() {
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
