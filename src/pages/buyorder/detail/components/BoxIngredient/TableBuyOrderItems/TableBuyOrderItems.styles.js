import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: 350,

    "& .TableBuyOrderItem-Body": {
      "&::-webkit-scrollbar": {
        width: 8,
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#bcbcbc",
        borderRadius: 4,
        border: "2px solid transparent",
        backgroundClip: "content-box",
        "&:hover": {
          backgroundColor: "#A3A8AF",
        },
      },
    },
  },
}));

export default useStyles;
