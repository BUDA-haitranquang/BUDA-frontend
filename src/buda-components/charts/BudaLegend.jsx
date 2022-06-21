import { Box } from "@mui/material";

const BudaLegend = ({ data, colors, style, ...props }) => {
  const renderItem = data.map((item, index) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Box
          sx={{
            backgroundColor: colors[index],
            width: "20px",
            height: "20px",
          }}
        ></Box>
        <Box px={1}></Box>
        <h3>{item.name[0].toUpperCase() + item.name.substring(1)}</h3>
      </Box>
    );
  });

  return (
    <Box sx={style}>
      {renderItem}
    </Box>
  );
};

export default BudaLegend;
