import { Global } from "@emotion/react";
import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) =>
  createTheme({
    "@global": {
      "*": {},
    },
  })
);

const GlobalStyles = () => {
  useStyle();
  return null;
};

export default GlobalStyles;
