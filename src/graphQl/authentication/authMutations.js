import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation newUser(
    $username: String!
    $phoneNumber: String
    $email: String!
    $firstName: String!
    $lastName: String
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
    {username}
  }
`