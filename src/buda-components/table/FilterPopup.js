import FilterListIcon from "@mui/icons-material/FilterList";
import { IconButton, MenuItem } from "@mui/material";
import Popover from "@mui/material/Popover";
import * as React from "react";
const FilterPopup = ({ list }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <FilterListIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {list.map((item, index) => {
          return (
            <MenuItem onClick={handleClose} key={index}>
              {" "}
              {item}{" "}
            </MenuItem>
          );
        })}
      </Popover>
      {/* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {list.map((item, index) => {
          return (
            <MenuItem onClick={handleClose} key={index}>
              {" "}
              {item}{" "}
            </MenuItem>
          );
        })}
      </Menu> */}
    </div>
  );
};

export default FilterPopup;
