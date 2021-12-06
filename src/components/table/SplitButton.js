import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useState,useRef } from 'react';
//import { makeStyles } from '@mui/material';
import { Typography } from '@mui/material';
import Popover from '@mui/material/Popover';


export default function SplitButton({options,searchBy}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const list = Array.from(options,item=>item.label);
//   const handleClick = () => {
// //    console.info(`You clicked ${options[selectedIndex]}`);
//   };

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
      <ButtonGroup variant="text" ref={anchorRef} aria-label="split button">
        <Button  >{list[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popover
        //sx={{position:'absolute'}}
        open={open}
        onClose ={handleClose}
        anchorEl={anchorRef.current}
        //role={undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
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
                      {option.toUpperCase()}
                    </MenuItem>
                  ))}

      </Popover>
    </React.Fragment>
  );
}
