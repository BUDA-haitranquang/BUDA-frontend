import { gql } from "@apollo/client";

export const ADD_FIXED_COST_MUTATION = gql`
    mutation newFixedCost(
        $name: String!
        $description: String!
        $moneyAmount: Float!
        $period: Int! 
    )
    {
        newFixedCost(
            fixedCostInput:{
                name: $name
                moneyAmount: $moneyAmount
                description: $description
                period: $period
            }
        )
        {fixedCostID}
    }
`;

export const UPDATE_FIXED_COST_MUTATION = gql `
    mutation updateFixedCost(
        $name: String!
        $description: String!
        $moneyAmount: Float!
        $period: Int!
    )
    {
        updateFixedCost(
            fixedCost:{
                name: $name
                moneyAmount: $moneyAmount
                description: $description
                period: $period
            }
        )
        {fixedCostID}
    }
`;