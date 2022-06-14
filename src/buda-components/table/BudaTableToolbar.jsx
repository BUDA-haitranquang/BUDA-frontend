import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha } from "@mui/material/styles";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SplitButton from "./SplitButton";
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
}) => {
  const [value, setValue] = useState("");
  const li = Array.from(headCells, (item) => item.label);
  const { t } = useTranslation(["common"]);

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
          sx={{ flex: "1 1 60%", fontWeight: "600", color: "#1c6cb3" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {t("common:data")}
        </Typography>
      )}

      {numSelected === 0 && (
        <FormControl variant="outlined">
          <InputLabel>{t("common:search")}</InputLabel>
          <OutlinedInput
            label={t("common:search")}
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
        <Box>
          <Button
            id="basic-button"
            variant="contained"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickBulkAction}
            style={{ width: "200px", fontWeight: "600", marginRight: "20px" }}
          >
            Choose Action
            <ArrowDropDownIcon sx={{ marginLeft: "10px" }} />
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
            <MenuItem onClick={deleteItem}>Delete</MenuItem>
            {printable && <MenuItem onClick={printItem}>Print</MenuItem>}
          </Menu>
        </Box>
      ) : (
        checkModal && (
          <Box display="flex" flexDirection="row">
            <Tooltip title="Add">
              <IconButton onClick={handleOpen}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )
      )}
    </Toolbar>
  );
};

export default BudaTableToolbar;
