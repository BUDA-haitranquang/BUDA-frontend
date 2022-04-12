import {gql} from '@apollo/client';

export const ADD_CUSTOMER_MUTATION = gql`
    mutation newCustomer(
      $name: String!
      $phoneNumber: String!
      $address: String!
      $totalSpend: Float!
      $gender: Gender
      $ageGroup: AgeGroup
    ){
        newCustomer(
            customerInput:{
                name: $name
                phoneNumber: $phoneNumber
                address: $address
                totalSpend: $totalSpend
                gender: $gender
                ageGroup: $ageGroup
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