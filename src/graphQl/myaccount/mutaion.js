import { gql } from "@apollo/client";

export const SET_USER = gql`
mutation(
    $userUUID:String!
    $userName:String!
    $lastName:String!
    $email:String!
    $phoneNumber:String!
    $firstName:String!
    $password:String!
    ) {
    updateUser(
      user:{
        userUUID:$userUUID
        userName:$userName
        lastName:$lastName
        firstName:$firstName
        email:$email
        phoneNumber:$phoneNumber
        password:$password
      }
    ) {
      userID
    }
  }

`;
export const NEW_STORE = gql`
mutation(
    $name:String
    $address:String
){
    newStore(store:{
        name:$name
        address:$address
    }){
        storeID
    }
}`

export const UPDATE_STORE = gql`
mutation updateStore(
  $storeID:Int
  $name:String
  $userID:Int
  $address:String
){
  updateStore(store:{
    storeID: $storeID
    userID:$userID
    name: $name
    address:$address
  }){
    userID
  }
}`