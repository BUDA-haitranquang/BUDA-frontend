import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button, Typography, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { removeToken } from "src/redux/tokenSlice";
import Notification from "src/components/Notification";
import ChangePassModal from "src/components/modal/ChangePassModal";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPass, setOpenPass] = React.useState();
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

  const handleMyAccount = () => {
    handleClose();
    history.push("/account");
  };
  // console.log(openPass);
  return (
    <Box
      sx={{
        width: "350px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          borderRadius: "20px",
          backgroundImage: "linear-gradient(to right, #1367ba, #409fff)",
          maxHeight: "40px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button
          disableRipple
          id="basic-button"
          variant="text"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{ color: "rgba(255,255,255,0.8)", fontWeight: "600" }}
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
        sx={{
          display: "flex",
          alignItems: "center",
          background: "#a7ccfc",
          borderRadius: "30px",
          height: 25,
        }}
      >
        <Button
          disableRipple
          onClick={() => changeLanguage("en")}
          sx={{
            display: "inline-block",
            borderRadius: "20px",
            padding: 0.1,
            background:
              window.localStorage.getItem("i18nextLng") !== "en"
                ? "transparent"
                : "#1367ba",
            "&:hover": {
              //you want this to be the same as the backgroundColor above
              background:
                window.localStorage.getItem("i18nextLng") !== "en"
                  ? "transparent"
                  : "#1367ba",
            },
          }}
        >
          <Typography
            variant="subtitle1"
            noWrap
            fontWeight="bold"
            fontFamily="'Montserrat', san-serif"
            sx={{
              textTransform: "uppercase",
              color:
                window.localStorage.getItem("i18nextLng") === "en"
                  ? "white"
                  : "#1367ba",
              "&:hover": {
                //you want this to be the same as the backgroundColor above
                color:
                  window.localStorage.getItem("i18nextLng") === "en"
                    ? "white"
                    : "#1367ba",
              },
            }}
          >
            ENG
          </Typography>
        </Button>
        <Button
          disableRipple
          onClick={() => changeLanguage("vi")}
          sx={{
            display: "inline-block",
            borderRadius: "20px",
            padding: 0.1,
            background:
              window.localStorage.getItem("i18nextLng") === "en"
                ? "transparent"
                : "#1367ba",
            "&:hover": {
              //you want this to be the same as the backgroundColor above
              background:
                window.localStorage.getItem("i18nextLng") === "en"
                  ? "transparent"
                  : "#1367ba",
            },
          }}
        >
          <Typography
            variant="subtitle1"
            noWrap
            fontWeight="bold"
            fontFamily="'Montserrat', san-serif"
            sx={{
              textTransform: "uppercase",
              color:
                window.localStorage.getItem("i18nextLng") !== "en"
                  ? "white"
                  : "#1367ba",
              "&:hover": {
                //you want this to be the same as the backgroundColor above
                color:
                  window.localStorage.getItem("i18nextLng") !== "en"
                    ? "white"
                    : "#1367ba",
              },
            }}
          >
            VIE
          </Typography>
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
