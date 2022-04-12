import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    "& .CustomerDetail-info": {
      padding: 5,
      display: "flex",
      flex: "1 1",

      "& .CustomerDetail-info-field": {
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
  },
}));

export default useStyles;
