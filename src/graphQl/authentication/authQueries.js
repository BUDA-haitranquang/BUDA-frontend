import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  query userLogin(
    $email: String!
    $password: String!
  ){
    userLogin(
      email: $email
      password: $password
    ){
      accessToken
      refreshToken
    }
  }
`;
