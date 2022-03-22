import { gql } from "@apollo/client";

export const ADD_FIXED_COST_BILL_MUTATION = gql`
    mutation newFixedCostBill(
        $userID: Int!
        $totalSpend: Float!
        $message: String!
        $creationTime: String!
        $dueTime: String!
    )
    {
        newFixedCostBill(
            fixedCostBillInput:{
                totalSpend: $totalSpend
                message: $message
                creationTime: $creationTime
                dueTime: $dueTime
            }
        )
        {fixedCostBillID}
    }
`;

