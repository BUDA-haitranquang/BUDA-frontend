import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    "& .BoxSupplier-main": {
      padding: 16,
      display: "flex",
      flex: "1 1",
      flexDirection: "column",
      justifyContent: "space-between",

      "& .BoxSupplier-header": {
        display: "flex",
        flex: "1 1",
        flexDirection: "column",
        rowGap: 16,

        borderBottom: "1px solid #F3F4F5",
        paddingBottom: 16,

        "& .BoxSupplier-header-chosen-supplier": {
          display: "flex",
          flex: "1 1",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",

          "& .icon": {
            width: 40,
          }
        }
      }
    }
  },
}));

export default useStyles;