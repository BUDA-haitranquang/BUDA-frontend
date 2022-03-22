import {gql} from '@apollo/client';

export const ADD_CUSTOMER_MUTATION = gql`
    mutation newCustomer(
      $name: String!
      $phoneNumber: String!
      $address: String!
      $totalSpend: Float!
    ){
        newCustomer(
            customerInput:{
                name: $name
                phoneNumber: $phoneNumber
                address: $address
                totalSpend: $totalSpend
            })
        {customerID}
    }
`;

export const HIDE_CUSTOMER_MUTATION = gql`
    mutation hideCustomer($customerID: Int!){
        hideCustomer(customerID: $customerID){
            customerID
        }
    }
    
`