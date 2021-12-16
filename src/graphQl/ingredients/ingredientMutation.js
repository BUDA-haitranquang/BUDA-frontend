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