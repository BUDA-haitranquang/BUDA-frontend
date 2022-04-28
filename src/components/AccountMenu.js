import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import UKflag from "../assets/UK-flag.png";
import VIflag from "../assets/VN-flag.png";
import { removeToken } from "../redux/tokenSlice";
import Notification from "./Notification";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const open = Boolean(anchorEl);

  const { i18n } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(removeToken());
    history.push("/login");
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box
      sx={{
        width: "300px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      <Box>
        <Button
          id="basic-button"
          variant="text"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{ color: "white", fontWeight: "600" }}
        >
          <AccountCircleIcon sx={{ paddingRight: "4px", fontSize: "2rem" }} />
          Username
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button"
          }}
        >
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        <Notification />

      </Box>

      <Box
        className="languages"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Button onClick={() => changeLanguage("en")}>
          <img
            src={UKflag}
            alt=""
            style={{ width: "30px", height: "20px" }}
          ></img>
        </Button>
        <Button onClick={() => changeLanguage("vi")}>
          <img
            src={VIflag}
            alt=""
            style={{ width: "30px", height: "20px" }}
          ></img>
        </Button>
      </Box>
    </Box>
  );
}
