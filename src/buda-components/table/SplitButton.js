import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import * as React from "react";
import { useRef, useState } from "react";
import color from "src/theme/color";

export default function SplitButton({ options, searchBy }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const list = Array.from(options, (item) => item.label);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    searchBy(options[index].id);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="text"
        ref={anchorRef}
        aria-label="split button"
        sx={{ color: color.PRIMARY_LIGHT }}
      >
        <Button sx={{ color: color.PRIMARY_LIGHT }}>
          {list[selectedIndex]}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon sx={{ color: color.PRIMARY_LIGHT }} />
        </Button>
      </ButtonGroup>
      <Popover
        //sx={{position:'absolute'}}
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        //role={undefined}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transition
        disablePortal
      >
        {list.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === selectedIndex}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option?.toUpperCase() || ""}
          </MenuItem>
        ))}
      </Popover>
    </React.Fragment>
  );
}
