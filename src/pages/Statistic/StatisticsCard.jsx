import { useEffect } from "react";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";

const getColor = (idx) => {
  if (idx === 0) return "#000000";
  if (idx === 1) return "#404040";
  return "#5a5a5a";
};

const getMedalColor = (idx, type) => {
  if (type === "success") {
    if (idx === 0) return "success";
    if (idx === 1) return "action";
  }
  if (type === "error") {
    if (idx === 0) return "error";
    if (idx === 1) return "action";
  }
};

const getTextNameStyle = (idx) => {
  if (idx === 0) return "h5";
  if (idx === 1) return "h6";
  return "subtitle1";
};
const StatisticsCard = ({ data, title, icon, type }) => {
  useEffect(() => {}, []);

  return (
    <Card sx={{ padding: "6px 12px 12px 12px" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            mb={2}
            color={type === "success" ? "green" : "red"}
          >
            {title}
          </Typography>
          {icon}
        </Box>

        {data &&
          data.map((item, idx) => (
            <Box key={idx}>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "4px",
                  }}
                >
                  <Typography
                    variant={getTextNameStyle(idx)}
                    component="div"
                    mr={4}
                    color={getColor(idx)}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    color={getColor(idx)}
                  >
                    {item.mainStats.toLocaleString()}
                  </Typography>
                </Box>
                {idx < 2 && (
                  <LocalPoliceIcon color={getMedalColor(idx, type)} />
                )}
              </Box>
            </Box>
          ))}
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
