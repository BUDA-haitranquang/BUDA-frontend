import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import React, { useState } from "react";
import FilterPopup from "./FilterPopup";
import SplitButton from "./SplitButton";

const BudaTableToolbar = ({
  headCells,
  numSelected,
  handleOpen,
  handleSearch,
  searchBy,
  deleteItem,
}) => {
  const [value, setValue] = useState("");
  const li = Array.from(headCells, (item) => item.label);
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        paddingTop: "10px",
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 60%", fontWeight: "600", color: "#1c6cb3" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          DATA
        </Typography>
      )}

      {numSelected === 0 && (
        <FormControl variant="outlined">
          <InputLabel>Search</InputLabel>
          <OutlinedInput
            label="Search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton type="submit" onClick={(e) => handleSearch(value)}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            startAdornment={
              <InputAdornment position="start">
                <SplitButton
                  options={headCells}
                  searchBy={(val) => searchBy(val)}
                />
              </InputAdornment>
            }
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch(value);
            }}
          />
        </FormControl>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={deleteItem}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Box display="flex" flexDirection="row">
          {/* <Tooltip title="Filter list">
            <FilterPopup list={li} />
          </Tooltip> */}
          <Tooltip title="Add">
            <IconButton onClick={handleOpen}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Toolbar>
  );
};

export default BudaTableToolbar;
