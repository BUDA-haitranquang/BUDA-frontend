import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, IconButton, Menu, MenuItem, Box } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_NOTIFICATION_BY_USER } from "../graphQl/notification/notificationByUser";
import { useState, useEffect } from "react";
const Notification = () => {
  const notificationData = useQuery(GET_NOTIFICATION_BY_USER);
  // console.log(notificationData?.data?.notiByUser);
  const notiData = notificationData?.data?.notiByUser;

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
        <Badge badgeContent={notiData?.length} color="secondary">
          <NotificationsIcon style={{ color: "white" }} />
        </Badge>
      </IconButton>
      <Menu
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        style={{ marginLeft: "2rem" }}
      >
        {notiData?.slice(0, 20).map((element, index) => (
          <MenuItem key={index}>
            <Box height="30px">{element.message}</Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Notification;
