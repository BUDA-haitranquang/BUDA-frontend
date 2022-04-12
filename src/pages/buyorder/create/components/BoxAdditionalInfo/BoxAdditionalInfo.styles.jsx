import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    overflow: "auto",
    padding: "0 16px",
    height: "100%",

    "& .BoxAdditionalInfo-header": {
      display: "flex",
      alignItems: "center",
      height: 60,

      "& .BoxAdditionalInfo-main": {
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
  },
}));

export default useStyles;
