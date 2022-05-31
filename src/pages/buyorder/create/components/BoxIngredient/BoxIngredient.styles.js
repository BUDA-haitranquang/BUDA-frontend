import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    "& .BoxIngredient-main": {
      padding: 16,

      "& .BoxIngredient-header": {
        display: "flex",
        flex: "1 1",
        flexDirection: "column",
        rowGap: 16,

        borderBottom: "1px solid #F3F4F5",
        paddingBottom: 16,
      }
    }
  }
}));

export default useStyles;