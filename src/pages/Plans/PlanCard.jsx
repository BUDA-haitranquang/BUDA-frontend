import { Box, Typography, Button } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const PlanCard = ({ description, name, price, duration, planType }) => {
  const basicColorSet = {
    title: "rgba(0, 111, 173, 1)",
    duration: "rgba(3, 125, 193, 1)",
    button: "rgba(1, 151, 236, 1)",
    background:
      "linear-gradient(to bottom, rgba(0, 163, 255, 1), rgba(130, 225, 255, 1))",
    price: "white",
    description: "white",
  };

  const proColorSet = {
    title: "rgba(156, 219, 255, 1)",
    duration: "rgba(0, 85, 133, 1)",
    button: "rgba(1, 123, 192, 1)",
    background:
      "linear-gradient(to bottom, rgba(0, 110, 171, 1), rgba(98, 212, 255, 1))",
    price: "white",
    description: "white",
  };

  const premiumColorSet = {
    title: "rgba(99, 77, 0, 1)",
    duration: "rgba(155, 121, 0, 1)",
    button: "rgba(189, 148, 0, 1)",
    background:
      "linear-gradient(to bottom, rgba(208, 162, 0, 1), rgba(255, 232, 151, 1))",
    price: "rgba(136, 106, 0, 1)",
    description: "rgba(136, 106, 0, 1)",
  };

  const mockDescription = [
    "Super pro",
    "Omega pro",
    "Extreme pro",
    "No ads",
    "Unlimited resource",
  ];
  const pickColorSet = (planType) => {
    switch (planType) {
      case "BASIC":
        return basicColorSet;
      case "PRO":
        return proColorSet;
      case "PREMIUM":
        return premiumColorSet;
      default:
        return basicColorSet;
    }
  };
  return (
    <Box
      sx={{
        backgroundImage: pickColorSet(planType).background,
        backgroundSize: "300%",
        backgroundPosition: "top",
        width: 300,
        height: 600,
        borderRadius: "20px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        transition: "transform 0.5s, background-image 1s",
        "&:hover": {
          transform: "scale(1.05)",
          transition: "transform 0.7s",
          backgroundPosition: "bottom",
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
        height="100%"
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: pickColorSet(planType).title }}
        >
          {name.toUpperCase()}
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: pickColorSet(planType).price,
            }}
          >
            {price}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: pickColorSet(planType).price,
            }}
          >
            VND
          </Typography>
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: pickColorSet(planType).duration,
          }}
        >
          {duration} DAYS
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          {mockDescription.map((item, index) => (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <CircleIcon
                sx={{
                  mr: 1,
                  color: pickColorSet(planType).description,
                  width: "6px",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontStyle: "italic",
                  color: pickColorSet(planType).description,
                }}
                key={index}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
        <Button
          disableRipple
          disableFocusRipple
          disableTouchRipple
          sx={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            background: pickColorSet(planType).button,
            borderRadius: "100px",
            width: 190,
            height: 55,
            transition: "transform 0.7s",
            "&:hover": {
              transform: "scale(1.1)",
              transition: "transform 0.7s",
              background: pickColorSet(planType).button,
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "white",
            }}
          >
            BUY NOW
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default PlanCard;
