import { gql } from "@apollo/client";

export const LOAD_PRODUCTS = gql`
  query {
    productsByUser {
      name
      description
    }
  }
`;
