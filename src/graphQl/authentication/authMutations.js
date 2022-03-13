import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation userLogin(
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

export const REGISTER_USER = gql`
  mutation newUser(
    $username: String!
    $phoneNumber: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ){
    newUser(
      userRegister:{
        username: $username
        phoneNumber: $phoneNumber
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    )
      
  }
`

export const NEW_ACCESS_TOKEN = gql`
  mutation newAccessToken(
    $token: String!
  ){
    newAccessToken(
      jwtSimple:{
        token: $token
      }
    )
    {accessToken, refreshToken}
  }
`