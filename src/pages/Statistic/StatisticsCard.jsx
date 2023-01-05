import { useEffect } from "react";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

const StatisticsCard = ({ data, title }) => {
  useEffect(() => {
  }, []);

  return <Card sx={{padding: "14px", marginLeft: "32px", marginRight: "32px"}}>
    <CardContent>
      <Typography variant="h5" component="div" mb={2}>
        {title}
      </Typography>
      {data && data.map(item => (
        <>
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Typography variant="subtitle1" component="div" mr={4}>
              {item.name}
            </Typography>
            <Box />
            <Typography variant="h6" component="div">
              {item.mainStats.toLocaleString()}
            </Typography>
            {item?.secondStats &&
              <Typography variant="subtitle2" component="div">
                {item.secondStats.toLocaleString()}
              </Typography>}

          </Box>
        </>

      ))}
    </CardContent>
  </Card>;
};

export default StatisticsCard;
