import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import SplitButton from "./SplitButton";
import color from "src/theme/color";

const BudaTableToolbar = ({
  headCells,
  numSelected,
  handleOpen,
  handleSearch,
  searchBy,
  deleteItem,
  printItem,
  printable = false,
  checkModal,
  canSearch,
  title,
}) => {
  const [value, setValue] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClickBulkAction = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseBulkAction = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar
      sx={{
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        pt: 3,
        backgroundColor: color.PRIMARY,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {numSelected > 0 ? (
        <Typography
          fontFamily="'Andika', san serif"
          sx={{ flex: "1 1 100%", color: color.PRIMARY_LIGHT }}
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          fontFamily="'Andika', san serif"
          sx={{
            flex: "1 1 60%",
            fontWeight: "600",
            color: color.PRIMARY_LIGHT,
          }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected === 0 && canSearch && (
        <FormControl
          variant="standard"
          sx={{ backgroundColor: color.PRIMARY_MEDIUM, borderRadius: "15px" }}
        >
          <OutlinedInput
            sx={{
              borderRadius: "15px",
              borderWidth: "1px",
              input: {
                color: color.PRIMARY_LIGHT,
                fontFamily: "'Andika', san serif",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: `0.2px solid ${color.PRIMARY_LIGHT}`,
                },
              },
              "&:hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: `0.2px solid ${color.PRIMARY_LIGHT}`,
                },
              },
            }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  onClick={(e) => handleSearch(value)}
                  sx={{ color: color.PRIMARY_LIGHT }}
                >
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
        <Box
          sx={{
            pt: 3,
            backgroundColor: color.PRIMARY,
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Button
            id="basic-button"
            variant="contained"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickBulkAction}
            sx={{
              width: "200px",
              fontWeight: "600",
              marginRight: "20px",
              backgroundColor: color.PRIMARY_LIGHT,
              "&:hover": {
                backgroundColor: color.PRIMARY_LIGHT,
              },
            }}
          >
            <Typography
              fontFamily="'Andika', san serif"
              sx={{ color: color.PRIMARY }}
            >
              Choose Action
            </Typography>
            <ArrowDropDownIcon
              sx={{ marginLeft: "10px", color: color.PRIMARY }}
            />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseBulkAction}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                deleteItem();
                setAnchorEl(null);
              }}
            >
              Delete
            </MenuItem>
            {printable && (
              <MenuItem
                onClick={() => {
                  printItem();
                  setAnchorEl(null);
                }}
              >
                Print
              </MenuItem>
            )}
          </Menu>
        </Box>
      ) : (
        checkModal && (
          <Box display="flex" flexDirection="row">
            <Tooltip title="Add">
              <IconButton onClick={handleOpen}>
                <AddIcon sx={{ color: color.PRIMARY_LIGHT }} />
              </IconButton>
            </Tooltip>
          </Box>
        )
      )}
    </Toolbar>
  );
};

export default BudaTableToolbar;
