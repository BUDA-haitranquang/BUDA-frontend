import { createTheme, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  "@global": {
    "*": {
      typography: {
        fontFamily: ["'Montserrat'", "sans - serif"].join(","),
      },
    },
  },
});

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          fontFamily: "'Montserrat', san-serif",
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};
export default Theme;
