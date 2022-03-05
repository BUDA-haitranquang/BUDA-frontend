import {gql} from '@apollo/client'

export const LOAD_DISCOUNTS = gql`
        query{
            discountsByUser{
                discountID
                name
                percentage
                cash
                cashLimit
                orderCount
                expiryTime
                createdTime   
            }
        }`