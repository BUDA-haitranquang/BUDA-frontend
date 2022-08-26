import { gql } from "@apollo/client";

export const GET_PLANS = gql`
  query {
    plans {
      planID
      name
      price
      planType
      duration
      description
      pictureID
    }
  }
`;
