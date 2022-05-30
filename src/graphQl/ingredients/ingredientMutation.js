import {gql} from '@apollo/client';

export const ADD_INGREDIENT_MUTATION = gql`
    mutation newIngredient(
        $name: String!
        $ingredientSKU: String
        $amountLeft: Int!
        $price: Float!
        $description: String
    ){
        newIngredient(
            ingredientInput:{
                name:$name
                ingredientSKU: $ingredientSKU
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
        $ingredientSKU: String
        $name: String!
        $description: String!
        $amountLeft: Int!
        $price: Float!
        $alertAmountLeft: Int!
    ){
        editIngredient(
            ingredientID: $ingredientID
            ingredient:{
                ingredientSKU: $ingredientSKU
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

export const EDIT_INGREDIENT_QUANTITY = gql `
    mutation editIngredientQuantity(
        $ingredientID: Int!
        $amountLeftChange: Int!
        $message: String!
    )
    {
        editIngredientQuantity(
            ingredientID: $ingredientID
            quantityLog: {
                amountLeftChange: $amountLeftChange
                message: $message
            }
        )
        {
            ingredientID
            amountLeft
        }
    }
    
`

export const REATAIL_FROM_INGREDIENT = gql`
    mutation newRetailFromIngredient(
        $ingredientID: Int!
        $productSKU: String!
        $price: Float!
    )
    {
        newRetailFromIngredient(
            newRetail:{
                ingredientID: $ingredientID
                productSKU: $productSKU
                price: $price
            }
        )
        {
            productID
        }
    }
    
`;
