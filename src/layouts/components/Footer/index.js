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
          variant="h5"
          sx={{
            color: color.PRIMARY,
            textAlign: "center",
          }}
          fontFamily="'Righteous', cursive"
        >
          BUDA - A solution for bussiness management
        </Typography>
        <Typography
          sx={{
            color: color.PRIMARY,
            mb: 1,
            textAlign: "center",
          }}
        >
          COPYRIGHT © 2023 BUDA. All right reserved
        </Typography>
      </Box>
      <Box
        width="50%"
        height="350px"
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
      >
        <Box
          height="350px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            sx={{
              color: color.PRIMARY,
              fontWeight: 900,
              mb: 1,
            }}
          >
            CONTACT US
          </Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <LocalPhoneTwoToneIcon
              sx={{
                color: color.PRIMARY,
                mr: 1,
              }}
              fontSize="medium"
            />
            <Typography
              // variant="h6"
              sx={{
                color: color.PRIMARY,
              }}
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
              fontSize="medium"
            />
            <Typography
              // variant="h6"
              sx={{
                color: color.PRIMARY,
              }}
            >
              budatester@gmail.com
            </Typography>
          </Box>
        </Box>
        <Box
          marginTop="-20px"
          height="350px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            sx={{
              color: color.PRIMARY,
              fontWeight: 900,
              mt: 2,
              mb: 1,
            }}
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
    </Box>
  );
}
