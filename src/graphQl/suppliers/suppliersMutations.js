import {gql} from '@apollo/client';

export const ADD_SUPPLIER_MUTATION = gql`
    mutation newSupplier(
        $name: String!
        $address: String!
        $phoneNumber: String!
        $email: String!
    ){
        newSupplier(
            supplierInput:{
                name: $name
                address: $address
                phoneNumber: $phoneNumber
                email: $email
            }
        )
        {supplierID}
    }`;