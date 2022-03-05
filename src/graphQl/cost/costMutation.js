import {gql} from '@apollo/client';

export const ADD_COST_MUTATION = gql`
    mutation newFixedCost(
      $name: String
      $description: String
      $period: Int
      $moneyAmount: Float
    ){
        newFixedCost(
            fixedCostInput:{
                name: $name
                description: $description
                period: $period
                moneyAmount: $moneyAmount
            })
        {fixedCostID}
    }`;