import {gql} from '@apollo/client';

export const ADD_INGREDIENT_MUTATION = gql`
    mutation newIngredient(
        $name: String!
        $amountLeft: Int!
        $price: Float!
        $description: String
    ){
        newIngredient(
            ingredientInput:{
                name:$name
                amountLeft:$amountLeft
                price:$price
                description: $description
            }
        )
        {ingredientID}
    }`;

export const HIDE_INGREDIENT_MUTATION = gql`
    mutation hideIngredient($ingredientID: Int!){
        hideIngredient(ingredientID: $ingredientID){ingredientID}
    }`

export const UPDATE_INGREDIENT_MUTATION = gql`
    mutation editIngredient(
        $ingredientID: Int!
        $name: String!
        $description: String!
        $amountLeft: Int!
        $price: Float!
        $alertAmountLeft: Int!
    ){
        editIngredient(
            ingredientID: $ingredientID
            ingredient:{
                name: $name
                amountLeft: $amountLeft
                description: $description
                price: $price
                alertAmountLeft: $alertAmountLeft
            }
        )
        {ingredientID}
    }
`