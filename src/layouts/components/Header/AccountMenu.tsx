import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import UKflag from "src/assets/UK-flag.png";
import VIflag from "src/assets/VN-flag.png";
import { removeToken } from "src/redux/tokenSlice";
import Notification from "src/components/Notification";
import ChangePassModal from "src/components/modal/ChangePassModal";
export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPass, setOpenPass] = React.useState<undefined | Boolean>();
  const dispatch = useDispatch();
  const history = useHistory();
  const open = Boolean(anchorEl);
  const { i18n } = useTranslation();
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(removeToken());
    history.push("/login");
  };

  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };

  const handleMyAccount = () => {
    handleClose();
    history.push("/account");
  };
  // console.log(openPass);
  return (
    <Box
      sx={{
        width: "300px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Box
        style={{
          borderRadius: "20px",
          border: "2px rgba(0,0,0,0.5) solid",
          maxHeight: "40px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button
          id="basic-button"
          variant="text"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{ color: "black", fontWeight: "600" }}
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
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleMyAccount}>My account</MenuItem>
          <MenuItem
            onClick={() => {
              setOpenPass(true);
              handleClose();
            }}
          >
            Change password
          </MenuItem>
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
      <ChangePassModal
        isOpen={openPass}
        handleClose={() => {
          setOpenPass(false);
        }}
      />
    </Box>
  );
}
