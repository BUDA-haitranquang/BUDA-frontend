import {gql} from '@apollo/client';

export const ADD_DISCOUNTS_PERCENTAGE_MUTATION = gql`
    mutation newDiscount(
      $name: String
      $cashLimit: Float
      $orderCount: Int
      $expiryTime:String
      $createdTime:String
      $percentage: Float

    ){
        newDiscount(
            discountInput:{
                name: $name
                cashLimit: $cashLimit
                orderCount: $orderCount 
                expireTime: $expireTime
                createdTime: $createdTime
                percentage: $percentage

            })
        {discountID}
    }`;

export const ADD_DISCOUNTS_CASH_MUTATION = gql`
    mutation newDiscount(
      $name: String
      $cashLimit: Float
      $orderCount: Int
      $expiryTime:String
      $createdTime:String
      $cash: Float

    ){
        newDiscount(
            discountInput:{
                name: $name
                cashLimit: $cashLimit
                orderCount: $orderCount 
                expireTime: $expireTime
                createdTime: $createdTime
                cash: $cash

            })
        {discountID}
    }`;