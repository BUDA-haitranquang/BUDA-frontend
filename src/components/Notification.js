import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useQuery } from "@apollo/client";
import { GET_NOTIFICATION_BY_USER } from "../graphQl/notification/notificationByUser";
import { useState } from "react";

export const useStyles = makeStyles((theme) => ({
  menu: {
    "& .MuiPaper-root": {
      borderRadius: "10px"
    },
    marginLeft: "2rem",
    height: "350px"
  }
}));
const Notification = () => {
  const cls = useStyles();
  const notificationData = useQuery(GET_NOTIFICATION_BY_USER);
  const notiData = notificationData?.data?.notiByUser;

  const unseenNoti = () => {
    var count = 0;
    for (let i = 0; i < notiData?.length; i++) if (!notiData[i]?.seen) count++;
    return count;
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        {unseenNoti() > 0 ? (
          <Badge badgeContent={unseenNoti()} color="secondary">
            <NotificationsIcon style={{ color: "white" }} />
          </Badge>
        ) : (
          <NotificationsIcon style={{ color: "white" }} />
        )}
      </IconButton>
      {notiData ? (
        <Menu
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          className={cls.menu}
        >
          {notiData?.map((element, index) => (
            <MenuItem key={index}>
              <Box height="30px">{element.message}</Box>
            </MenuItem>
          ))}
        </Menu>
      ) : (
        <Menu
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          style={{ marginLeft: "2rem" }}
        >
          <MenuItem>
            <Box height="30px">No notifications</Box>
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default Notification;
