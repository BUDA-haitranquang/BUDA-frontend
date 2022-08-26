import { ThemeOptions } from "@mui/material/styles/createTheme";
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
} as ThemeOptions);

interface childProps {
  children: JSX.Element;
}

const Theme = ({ children }: childProps) => {
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
