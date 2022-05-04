import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    "& .BoxMoney-block": {
      padding: "16px 48px 16px 16px",
      display: "flex",
      justifyContent: "flex-end",

      "& .BoxMoney-block-field": {
        color: "#747C87",
        position: "relative",
        width: 120,
        paddingRight: 20,
        fontSize: "20px",

        "&:after": {
          right: 12,
          content: '""',
          position: "absolute",
        },
      },
    },
  },
}));

export default useStyles;
