import { makeStyles } from "@material-ui/core";
import { colorHovering } from "../../theme/palette";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    "& .SearchBox": {
      flex: "1 1",
    },
  },

  content: {
    "& .BudaLiveSearch-btnCreate": {
      minHeight: 50,
      justifyContent: "flex-start",
      padding: "0 28px",
      position: "relative",
      borderBottom: "1px solid",
      borderBottomColor: "#E8EAEB",

      "&:hover, &.focus-key-event": {
        backgroundColor: colorHovering.primary,
      },
    },

    "& .BudaLiveSearch-option": {
      minHeight: 50,
      padding: "0 28px",
      display: "flex",
      position: "relative",
      borderBottom: "1px solid",
      borderBottomColor: "#E8EAEB",
      cursor: "pointer",

      "&:hover, &.focus-key-event": {
        backgroundColor: colorHovering.primary,
      },
    },
  },
}));

export default useStyles;
