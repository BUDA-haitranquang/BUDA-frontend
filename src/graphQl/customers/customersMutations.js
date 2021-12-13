import {gql} from '@apollo/client';

export const ADD_CUSTOMER_MUTATION = gql`
    mutation newCustomer(
      $name: String!
      $phoneNumber: String!
      $address: String  
    ){
        newCustomer(
            customerInput:{
                name: $name
                phoneNumber: $phoneNumber
                address: $address
            })
        {customerID}
    }`;