import { useState } from "react";
import Box from "@material-ui/core/Box";
import BudaBarChart from "../../buda-components/charts/BudaBarChart";
const ProductsStatObject = ({label, data, dataKey}) => {
  const info = data.map((item) => {
    return {name:item.name,color:"#82ca9d",datakey:dataKey};
  });
  return (
    <Box sx={{ width: "100%" }}>
      <h1>{label}</h1>
      {/* <BudaBarChart
        // yUnit="k"
        data={data}
        info={info}
        // xAxis="timePeriod"
        //   legend={true}
        //   legendPosition = "right"
      /> */}
    </Box>
  );
};

export default ProductsStatObject;
