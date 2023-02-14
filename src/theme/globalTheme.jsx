import { createTheme, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  "@global": {
    "*": {
      typography: {
        fontFamily: ["'Andika'", "sans - serif"].join(","),
      },
    },
  },
});

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>{children}</Box>
    </ThemeProvider>
  );
};
export default Theme;
