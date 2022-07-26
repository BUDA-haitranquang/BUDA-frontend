import { gql } from "@apollo/client";

export const GET_USER = gql`
  query {
    currentUser {
      userID
      userUUID
      userName
      email
      phoneNumber
      lastName
      firstName
      pictureID
      password
    }
  }
`;

export const GET_STORE = gql`
query{
    storesByUser{
        storeID
        userID
        name
        address
    }
}`