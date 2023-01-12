import { Box, Typography } from "@mui/material";
import color from "src/theme/color";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <Box width="100%" height="350px" display="flex" mt={-5}>
      <Box
        width="50%"
        height="350px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h2"
          sx={{
            color: color.PRIMARY,
            textAlign: "center",
          }}
          fontFamily="'Righteous', cursive"
        >
          BUDA
        </Typography>
        <Typography
          sx={{
            color: color.PRIMARY,
            mb: 1,
            textAlign: "center",
          }}
          fontFamily="'Andika', san serif"
        >
          COPYRIGHT © 2023 BUDA. All right reserved
        </Typography>
      </Box>
      <Box
        width="50%"
        height="350px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography
          variant="h5"
          sx={{
            color: color.PRIMARY,
            fontWeight: 900,
            mb: 1,
          }}
          fontFamily="'Andika', san serif"
        >
          CONTACT US
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <LocalPhoneTwoToneIcon
            sx={{
              color: color.PRIMARY,
              mr: 1,
            }}
            fontSize="large"
          />
          <Typography
            variant="h6"
            sx={{
              color: color.PRIMARY,
            }}
            fontFamily="'Andika', san serif"
          >
            0123456789
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <EmailTwoToneIcon
            sx={{
              color: color.PRIMARY,
              mr: 1,
            }}
            fontSize="large"
          />
          <Typography
            variant="h6"
            sx={{
              color: color.PRIMARY,
            }}
            fontFamily="'Andika', san serif"
          >
            budatester@gmail.com
          </Typography>
        </Box>

        <Typography
          variant="h5"
          sx={{
            color: color.PRIMARY,
            fontWeight: 900,
            mt: 2,
            mb: 1,
          }}
          fontFamily="'Andika', san serif"
        >
          FOLLOW US
        </Typography>
        <Box display="flex" alignItems="baseline">
          <FacebookTwoToneIcon
            fontSize="large"
            sx={{
              color: color.PRIMARY,
              mr: 2,
            }}
          />
          <TwitterIcon
            fontSize="large"
            sx={{
              color: color.PRIMARY,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
