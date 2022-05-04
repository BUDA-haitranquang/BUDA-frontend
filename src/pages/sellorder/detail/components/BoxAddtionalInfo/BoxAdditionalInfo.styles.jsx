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
    },

    "& .BoxAdditionalInfo-main": {
      paddingBottom: 16,
      "& .BoxAdditionalInfo-info": {
        display: "flex",
        flex: "1 1",

        "& .BoxAdditionalInfo-info-field": {
          color: "#747C87",
          position: "relative",
          width: 120,
          paddingRight: 20,

          "&:after": {
            right: 12,
            content: '" :"',
            position: "absolute",
          },
        },
      },

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
