import { gql } from "@apollo/client";

export const LOAD_OTHER_COST = gql`
    query {
        otherCostsByUser{
            otherCostID
            userID
            totalCost
            creationTime
            name
            description
            status
            visible
        }
    }
`;