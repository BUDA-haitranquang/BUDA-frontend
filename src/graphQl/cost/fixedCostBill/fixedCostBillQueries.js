import { gql } from "@apollo/client";

export const LOAD_FIXED_COST_BILL = gql`
    query{
        fixedCostBillsByUser{
            fixedCostBillID
            userID
            totalSpend
            message
            creationTime
            dueTime
            }
        }
`;