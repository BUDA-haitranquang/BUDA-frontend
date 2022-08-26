import { gql } from "@apollo/client";

export const ADD_OTHER_COST = gql`
    mutation newOtherCost(
        $totalCost: Float!
        $name: String!
        $description: String!
        $status: Status!
    )
    {
        newOtherCost(
            otherCostInput:{
                name: $name
                status: $status
                description: $description
                totalCost: $totalCost
            }
        )
        {otherCostID}
    }
`;

export const HIDE_OTHER_COST = gql`
    mutation hideOtherCost($otherCostID: Int!){
        hideOtherCost(otherCostID: $otherCostID){
            otherCostID
        }
    }
`