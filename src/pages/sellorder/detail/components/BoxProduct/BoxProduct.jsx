import { Box, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import TableSellOrderItem from "./TableSellOrderItem/TableSellOrderItem";
import useStyles from "./BoxProduct.styles";

BoxProduct.propTypes = {
    sellOrderItems: PropTypes.array,
}

function BoxProduct(props){
    const { sellOrderItems } = props;
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
          <Box className="BoxProduct-main">
            <Box className="BoxProduct-header">
              <Typography variant="h6">Product list</Typography>
            </Box>
            <TableSellOrderItem sellOrderItems={sellOrderItems} />
          </Box>
        </Paper>
      );
}

export default BoxProduct;