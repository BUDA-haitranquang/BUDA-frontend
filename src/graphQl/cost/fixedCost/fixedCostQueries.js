import { gql } from "@apollo/client";

export const LOAD_FIXED_COST = gql`
    query{
        fixedCostsByUser{
            fixedCostID
            name
            description
            moneyAmount
            period
            userID
        }
    }
`;