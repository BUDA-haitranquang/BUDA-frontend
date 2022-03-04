import {gql} from '@apollo/client';

export const ADD_COST_MUTATION = gql`
    mutation newCost(
      $name: String!
      $fixedCostID: Int!
      $moneyAmount: Float!
    ){
        newCost(
            costInput:{
                name: $name
                fixedCostID: $fixedCostID
                moneyAmount: $moneyAmount
            })
        {userID}
    }`;