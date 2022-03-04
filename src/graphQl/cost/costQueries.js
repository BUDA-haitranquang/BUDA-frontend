import {gql} from '@apollo/client'

export const LOAD_COST = gql`
    query{
        costsByUser{
            fixedCostID
            name
            description
            moneyAmount
            period
            userID
    }}
`