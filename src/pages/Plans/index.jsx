import PlanCard from "./PlanCard";
import { Box } from "@mui/material";
import { GET_PLANS } from "../../graphQl/plans/plans";
import { useQuery } from "@apollo/client";

const Plans = () => {
  const plansData = useQuery(GET_PLANS);
  const plans = plansData?.data?.plans?.slice(0, 3);
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-evenly"
      alignItems="center"
      width="100%"
      height="100vh"
    >
      {plans?.map((plan) => {
        return (
          plan && (
            <PlanCard
              description={plan.description}
              name={plan.name}
              price={plan.price}
              duration={plan.duration}
              planType={plan.planType}
            />
          )
        );
      })}
    </Box>
  );
};
export default Plans;
