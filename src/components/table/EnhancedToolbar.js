import React from "react";
import {InputBase, Toolbar, Typography, Tooltip, IconButton, Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import {useRef,useState} from'react';
const EnhancedToolbar = ({ numSelected, handleOpen,handleSearch }) => {
  //const dp = useDispatch();
  const search = useRef();
  const [value,setValue]=useState("");
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
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
          sx={{ flex: "1 1 100%", fontWeight: "600", color: "#1c6cb3" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          DATA
        </Typography>
      )}

      {numSelected === 0 && 
      <Box  sx={{display:'flex',border:'none',borderColour:'blue'}} >
        <InputBase placeholder="Search " value={value} onChange={(e)=>setValue(e.target.value)} />
        <IconButton type ='submit' onClick={(e) => handleSearch(value)} >
            <SearchIcon/>
        </IconButton>
      </Box>
      }

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
      ) : (
        <Box display="flex" flexDirection="row">
          <Tooltip title="Add">
            <IconButton onClick={handleOpen}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Toolbar>
  );
};

export default EnhancedToolbar;
