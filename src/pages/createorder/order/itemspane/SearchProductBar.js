import { useQuery } from "@apollo/client";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { LOAD_PRODUCTS } from "../../../../graphQl/products/productQueries";

const useStyle = makeStyles(() => ({
  root: {
    marginBottom: "12px",
    "& .MuiOutlinedInput-input": {
      paddingTop: "10px",
      paddingBottom: "10px",
      color: "black",
    },
  },
}));

export default function SearchProductBar() {
  const classes = useStyle();
  const { error, loading, data } = useQuery(LOAD_PRODUCTS);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (data) setProducts(data.productsByUser);
      console.log(data);
    }

    fetchData();
  }, [data]);
  return (
    <Box className={classes.root}>
      {/* <FormControl variant="outlined" fullWidth>
        <OutlinedInput
          placeholder="Search Product"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" onClick={(e) => handleSearch(value)}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSearch(value);
          }}
        />
      </FormControl> */}
      <Autocomplete
        disablePortal
        options={products.map((product) => product.description)}
        fullWidth
        renderInput={(params) => {
          console.log(params);
          return <TextField {...params} label="Search Product"></TextField>;
        }}
      />
    </Box>
  );
}
